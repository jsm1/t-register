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
            state: {
                watchedVideos: [],
                videos: [],
                completed: false,
                timeUpdatePromise: null,
                nextUnwatchedVideo: null,
            },
        })
        this.getInitialState().then(() => {
            this.applyState()
        }).catch((err) => {
            if (err === 'Not logged in') {
                console.log('Not logged in')
                return
            }
            console.error(err)
        })
        document.querySelectorAll('[data-show-videos]').forEach(el => {
            el.addEventListener('click', this.setVideosStared.bind(this))
        })
        document.querySelectorAll('[data-show-videos-again]').forEach(el => {
            el.addEventListener('click', this.showVideosPaneAfterCompletion.bind(this))
        })
        this.setBars()
    },
    async getInitialState() {
        await MemberStack.reload()
        const member = await MemberStack.onReady
        console.log('Member', member)
        if (!member.loggedIn) {
            throw 'Not logged in'
        }
        const watchedVideos = this.getWatchedVideos(member)
        const currentVideo = this.getCurrentVideo(member) || {}
        let currentVideoIsFirst = false
        if (!currentVideo.name) {
            currentVideoIsFirst = true
        }
        const videos = [...document.querySelectorAll(this.videoListItemSelector)]
        this.state.watchedVideos = watchedVideos
        this.state.completed = member.completed === true || member.completed === 'true'
        this.state.videosStarted = member['videos-started'] === true || member['videos-started'] === 'true'
        console.log('Completed', this.state.completed)
        this.state.videos = videos.map((video, index) => {
            const data = this.getVideoData(video)
            const isCurrent = currentVideo.name === data.name || (index === 0 && currentVideoIsFirst)
            video.addEventListener('click', videoUtils.onVideoItemClick)
            return {
                el: video,
                data,
                watched: watchedVideos.includes(data.name),
                current: isCurrent,
                playbackPosition: isCurrent ? (currentVideo.time || 0) : undefined,
            }
        })
    },
    applyState() {
        console.log('Videos', this.state.videos)
        this.state.videos.forEach((video, index) => {
            const videoEl = video.el
            videoEl.classList.remove(this.activeClass)
            if (!video.watched) {
                videoEl.classList.remove(this.watchedClass)
                videoEl.classList.add(this.disabledClass)
            } else {
                videoEl.classList.add(this.watchedClass)
            }
            if (video.current) {
                videoEl.classList.add(this.activeClass)
                videoEl.classList.remove(this.disabledClass)
                this.loadVideo(video.data.link, video.playbackPosition)
                this.setVideoData(video.data, video.playbackPosition)
            }
        })
        this.toggleCompletedConditionals()
        this.toggleVideosStartedConditionals()
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
        if (!currentVideo && !currentVideoTime) {
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
    loadVideo(videoUrl, seconds) {
        if (!this.player) {
            this.removeChildElements('#' + this.videoWrapperId)
            this.player = new Vimeo.Player(this.videoWrapperId, {
                url: videoUrl,

            });
            this.player.on('ended', this.onVideoEnd.bind(this))
            this.player.on('timeupdate', this.onVideoTimeUpdate.bind(this))
            if (seconds) {
                this.player.setCurrentTime(seconds)
            }
        } else {
            const extractedId = videoUrl.replace(/^.+\.com\/(.+)/, '$1')
            this.player.loadVideo(extractedId)
                .then(() => this.player.setCurrentTime(seconds || 0)) 
        }
             
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
            if (isSupportingLink) {
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
        const currentVideo = this.findCurrentVideo()
        if (!currentVideo) {
            return
        }
        const data = currentVideo.data
        const videoName = data.name
        this.state.watchedVideos.push(videoName)
        currentVideo.current = false
        currentVideo.playbackPosition = 0
        currentVideo.watched = true

        const nextVideo = this.getNextUnwatchedVideo()
        let complete = false
        if (!nextVideo) {
            complete = true
            this.state.completed = true
        } else {
            nextVideo.current = true
            nextVideo.playbackPosition = 0
        }

        const nextVideoData = nextVideo ? nextVideo.data : {}
        
        await this.updateState(this.state.watchedVideos, nextVideoData.name || null, 0, complete)

        this.applyState()
    },
    getNextUnwatchedVideo() {
        const watchedVideos = this.state.watchedVideos
        return this.state.videos.find(v => !watchedVideos.includes(v.data.name))
    },
    getNextVideo(videoName) {
        const videos = this.state.videos
        const matchingVideoIndex = videos.findIndex(v => {
            return v.data.name === videoName
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
            completed: complete,
        }, false).then(() => console.log('sucess')).catch((err) => console.log(err))
    },
    async onVideoTimeUpdate(event) {
        const seconds = event.seconds
        this.state.currentTime = seconds
        if (!this.timeUpdatePromise) {
            this.timeUpdatePromise = this.updateWatchTime(seconds).then(() => this.timeUpdatePromise = null)
        } 
    },
    async updateWatchTime(seconds) {
        const currentVideo = this.findCurrentVideo()
        if (!currentVideo) {
            return
        }
        const data = currentVideo.data
        const member = await MemberStack.onReady;
        return member.updateProfile({
            'current-video-time': seconds
        }, false)
    },
    findCurrentVideo() {
        return this.state.videos.find(v => v.current)
    },
    onVideoItemClick(event) {
        const videos = videoUtils.state.videos
        const matchingVideo = videos.find(v => v.el === this)
        const nextUnwatched = videoUtils.getNextUnwatchedVideo()
        const isNextUnwatched = nextUnwatched === matchingVideo
        if (!matchingVideo || (!matchingVideo.watched && !isNextUnwatched)) {
            return
        }
        videoUtils.setActiveVideo(matchingVideo)
    },
    setActiveVideo(video) {
        // Deactivate videos
        this.state.videos.forEach(v => {
            v.current = false
        })
        video.current = true
        video.playbackPosition = 0
        this.applyState()
    },
    toggleCompletedConditionals() {
        let displayValue = this.state.completed ? 'flex' : 'none'
        document.querySelectorAll('[data-completed-only]').forEach(el => el.style.display = displayValue)
        document.querySelectorAll('[data-watch-videos-again]').forEach(el => el.addEventListener('click', this.showVideosPane.bind(this)))
        if (this.state.completed && !window.localStorage.getItem('always-show-video')) {
            this.showVideosPane(false)
        }
    },
    toggleVideosStartedConditionals() {
        this.showIntroductoryPane(!this.state.videosStarted)
        this.showVideosPane(this.state.videosStarted)
    },
    setBars() {
        const regionData = this.getRegionData()
        const bars = this.getBars()
        Object.entries(regionData).forEach(([region, amountCompleted]) => {
            const matchingBar = bars[region]
            if (!matchingBar) {
                return
            }
            const percentage = Math.round((amountCompleted / matchingBar.total) * 100)
            matchingBar.chartEl.style.width = percentage + '%'
        })
    },
    getRegionData() {
        const regions = {};
        [...document.querySelectorAll('.region-list .region-total')].forEach(region => {
            const [nameDiv, amountDiv] = [...region.children];
            regions[nameDiv.innerText] = parseInt(amountDiv.innerText || 0)
        })
        return regions
    },
    getBars() {
        const bars = {};
        [...document.querySelectorAll('.bar-under')].forEach(barEl => {
            const dataAttribute = [...barEl.attributes].find(attr => attr.name.indexOf('data-total') !== -1)
            const regionName = dataAttribute.name.replace('data-total-', '').toUpperCase()
            const total = parseInt(dataAttribute.value)
            bars[regionName] = {
                total,
                chartEl: barEl.querySelector('.bar-over')
            }
        })
        return bars
    },
    showVideosPane(bool = true) {
        const displayValue = bool ? 'flex' : 'none';
        document.querySelector('[data-video-section]').style.display = displayValue;
    },
    showVideosPaneAfterCompletion() {
        window.localStorage.setItem('always-show-video', true)
        this.showVideosPane(true)
        document.querySelector('[data-video-section]').scrollIntoView()
    },
    showIntroductoryPane(bool = true) {
        const displayValue = bool ? 'flex' : 'none';
        document.querySelector('[data-welcome-section]').style.display = displayValue;
    },
    async setVideosStared() {
        this.showVideosPane(true)
        this.state.videosStarted = true
        this.applyState()
        const member = await MemberStack.onReady;
        return member.updateProfile({
            'videos-started': true
        }, false)
    },
}

module.exports = videoUtils;