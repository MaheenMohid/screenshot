ReactDOM.render(<h1>Capture ScreenShot </h1>, document.getElementById("h1"))
ReactDOM.render(<p>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas vel enim
    minus dolores suscipit velit cum. Minima doloribus porro voluptatum
    obcaecati repellat, cum reprehenderit ut, soluta quidem fuga culpa non!
</p>, document.getElementById("p1"))
ReactDOM.render(<h2>Dummy heading</h2>, document.getElementById("h2"))
ReactDOM.render(<p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto sunt
    eveniet, aliquid aperiam voluptatibus quos dicta placeat esse id culpa?
    Neque odit vitae sint veritatis praesentium voluptas cumque harum! Beatae!
</p>, document.getElementById("p2"))
ReactDOM.render(<button id="src-btn">Capture ScreenShot</button>, document.getElementById('button'))
ReactDOM.render(<div class="screenshot"> <i id="close-btn" class="fa fa-close" aria-hidden="true"></i> <img src="" alt="screenshot" /></div>, document.getElementById('src-preview'))

const screenshotBtn = document.querySelector('#src-btn')
var screenshotPreview = document.querySelector('#src-preview')
var closeBtn = screenshotPreview.querySelector('#close-btn')


const captureScreen = async () => {
    try {
        // asking permission to use a media input to record current tab
        const stream = await navigator.mediaDevices.getDisplayMedia({ preferCurrentTab: true })
        const video = document.createElement('video')

        video.addEventListener("loadedmetadata", () => {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')

            // passing video width & height 
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight

            video.play() //playing the video so the drawn image wont be be black or blank
            // drawing an image from the captured video stream
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
            stream.getVideoTracks()[0].stop() // terminating first video track of the stream

            // passing canvas data url as screenshot preview src
            screenshotPreview.querySelector('img').src = canvas.toDataURL()
            screenshotPreview.classList.add('show')



        })

        video.srcObject = stream // passing capture stream data as video source object
    } catch (error) { // if image couldn't capture by any reason, then alert the message
        alert("failed to capture screenshot!")
    }
}

closeBtn.addEventListener('click', () => screenshotPreview.classList.toggle("show")

)

screenshotBtn.addEventListener("click", captureScreen)
