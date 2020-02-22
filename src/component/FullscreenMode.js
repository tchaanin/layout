import React from 'react'
import FullScreen, { fullScreenSupported } from 'react-request-fullscreen'
// import FullScreen, { fullScreenSupported } from 'react-request-fullscreen'
import CropFreeIcon from '@material-ui/icons/CropFree';


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isFullScreen: false
        }
    }

    onFullScreenChange(isFullScreen) {
        this.setState({
            isFullScreen
        })
    }

    requestOrExitFullScreen() {
        this.fullScreenRef.fullScreen()
    }

    requestOrExitFullScreenByElement() {
        this.elFullScreenRef.fullScreen(this.elRef)
    }

    render() {
        const { isFullScreen } = this.state
        return (
            <div>
                <FullScreen ref={ref => { this.fullScreenRef = ref }} onFullScreenChange={this.onFullScreenChange.bind(this)}>
                    <div
                        onClick={this.requestOrExitFullScreen.bind(this)}
                    >
                        FullScreen
                    </div>
                </FullScreen>


            </div>
        )
    }
}
export default App;