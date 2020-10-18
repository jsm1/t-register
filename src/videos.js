const videoUtils = {
    init() {
        Object.assign(this, {
            videoDataAttribute: 'data-video',
            videoDataElement: '[data-video-data] > div',
            videoListItemSelector: '.sidebar-item',
            watchedClass: 'watched',
            activeClass: 'current',
            disabledClass: 'disabled',
            videoWrapperId: 'video-wrapper',
            videoNameAttribute: 'data-video-name',
            player: null,
            watchedVideos: null,
            currentVideo: null,
        })
        this.getAndApplyState()
    },
    getAndApplyState() {
        this.getVideoWatchState().then((state) => this.applyState(state))
    },
    async getVideoWatchState() {
        await MemberStack.reload()
        const member = await MemberStack.onReady
        if (!this.watchedVideos) {
            this.watchedVideos = this.getWatchedVideos(member)
        }
        if (!this.currentVideo) {
            this.currentVideo = this.getCurrentVideo(member)
        }
        const watchedVideos = this.watchedVideos
        const currentVideo = this.currentVideo;
        return { watchedVideos, currentVideo }
    },
    applyState({ watchedVideos, currentVideo }) {
        const videos = [...document.querySelectorAll(this.videoListItemSelector)]
        videos.forEach((video, index) => {
            const videoData = this.getVideoData(video)
            const isVideoWatched = watchedVideos.includes(videoData.name)
            video.classList.remove(this.activeClass)
            if (!isVideoWatched) {
                video.classList.remove(this.watchedClass)
                video.classList.add(this.disabledClass)
            } else {
                video.classList.add(this.watchedClass)
            }
            let videoToPlay = currentVideo
            if (index === 0 && !watchedVideos.length) {
                videoToPlay = { name: videoData.name, time: 0 }
            }

            if (videoToPlay && videoToPlay.name === videoData.name) {
                video.classList.add(this.activeClass)
                video.classList.remove(this.disabledClass)
                this.loadVideo(videoData.link)
                this.setVideoData(videoData)
                this.setPlaybackPosition(videoToPlay.time)
            }
        })
    },
    getWatchedVideos(member) {
        const list = member['videos-watched'] || ''
        const split = list.split(', ')
        if (split.length === 1 && !split[0]) {
            return []
        }
        return split
    },
    getCurrentVideo(member) {
        const currentVideo = member['last-video-watched']
        const currentVideoTime = member['current-video-time']
        if (!currentVideo) {
            return null;
        }
        return { name: currentVideo, time: currentVideoTime }
    },
    isComplete(member) {
        return member.completed
    },
    getVideoData(videoEl) {
        const dataWrapper = videoEl.querySelector(this.videoDataElement)
        if (!dataWrapper) {
            return null
        }
        const dataAttributes = [...dataWrapper.attributes]
        const data = {}
        dataAttributes.forEach(attr => {
            if (attr.name.indexOf(this.videoDataAttribute) !== -1) {
                const valueName = attr.name.replace(this.videoDataAttribute + '-', '')
                data[valueName] = attr.value
            }
        })
        return data
    },
    loadVideo(videoUrl) {
        if (!this.player) {
            this.removeChildElements('#' + this.videoWrapperId)
            this.player = new Vimeo.Player(this.videoWrapperId, {
                url: videoUrl,
            });
            this.player.on('ended', this.onVideoEnd.bind(this))
            this.player.on('timeupdate', this.onVideoTimeUpdate.bind(this))
        }
        const extractedId = videoUrl.replace(/^.+\.com\/(.+)/, '$1')
        this.player.loadVideo(extractedId)       
    },
    setPlaybackPosition(seconds) {
        this.player.setCurrentTime(seconds || 0)
    },
    removeChildElements(selector) {
        document.querySelectorAll(selector).forEach(el => el.children.forEach(child => child.parentNode.removeChild(child)));
    },
    setVideoData(data) {
        Object.entries(data).forEach(([key, value]) => {
            const matchingEl = document.querySelector(`[${this.videoDataAttribute}="${key}"]`)
            if (!matchingEl) {
                return
            }
            const isSupportingIcon = key.indexOf('icon') !== -1
            const isSupportingLink = key.indexOf('supportlink') !== -1
            if (isSupportingIcon) {
                matchingEl.hidden = !value
                matchingEl.src = value
            } else if (isSupportingLink) {
                matchingEl.href = value
            } else {
                matchingEl.innerText = value
            }
        })
        const isPresenter2 = data.presenter2 
        const ampersand = document.querySelector('[data-video="presenter1"] + .space-after')
        ampersand.hidden = !isPresenter2
    },
    async onVideoEnd(event) {
        const currentVideo = document.querySelector(this.videoListItemSelector + '.' + this.activeClass)
        if (!currentVideo) {
            return
        }
        const data = this.getVideoData(currentVideo)
        const videoName = data.name
        const { watchedVideos } = await this.getVideoWatchState()
        watchedVideos.push(videoName)
        const nextVideoEl = this.getNextVideo(videoName)
        let complete = false
        if (!nextVideoEl) {
            complete = true
        }
        const nextVideoData = nextVideoEl ? this.getVideoData(nextVideoEl) : null
        await this.updateState(watchedVideos, nextVideoData ? nextVideoData.name : null, 0, complete)

        // this.getAndApplyState()
        this.applyState({ watchedVideos, currentVideo: {
            name: nextVideoData.name,
            time: 0,
        }})
    },
    getNextVideo(videoName) {
        const videos = [...document.querySelectorAll(this.videoListItemSelector)]
        const matchingVideoIndex = videos.findIndex(v => {
            const data = this.getVideoData(v)
            return data.name === videoName
        })
        if (matchingVideoIndex === -1) {
            return null
        }
        const nextVideoIndex = matchingVideoIndex + 1
        if (nextVideoIndex < videos.length) {
            return videos[nextVideoIndex]
        }
        return null
    },
    async updateState(watchedVideos, currentVideo, currentVideoTime, complete) {
        console.log('Updating state', watchedVideos, currentVideo, currentVideoTime, complete)
        this.watchedVideos = watchedVideos
        this.currentVideo = currentVideo
        const member = await MemberStack.onReady;
        return member.updateProfile({
            'last-video-watched': currentVideo,
            'current-video-time': currentVideoTime,
            'videos-watched': watchedVideos.join(', '),
            complete,
        }, false);
    },
    async onVideoTimeUpdate(event) {
        const seconds = event.seconds
        this.updateWatchTime(seconds)
    },
    async updateWatchTime(seconds) {
        const currentVideo = document.querySelector(this.videoListItemSelector + '.' + this.activeClass)
        if (!currentVideo) {
            return
        }
        const data = this.getVideoData(currentVideo)
        const member = await MemberStack.onReady;
        member.updateProfile({
            'current-video-time': seconds
        }, false)
    },
}

module.exports = videoUtils;