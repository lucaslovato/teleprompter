import React, {Component} from 'react'
import screenfull from 'screenfull'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {faGithub} from '@fortawesome/fontawesome-free-brands'
import {Button, FormControlLabel, Switch, TextField} from '@material-ui/core'
import {Description, FastForward, Fullscreen, SwapHoriz, TextFields, SwapVert} from '@material-ui/icons'

import styles from './App.module.css'
import Slider from './Slider'
import TextScroller from './TextScroller'

export default class App extends Component {
    onFullScreenButtonClick = () => {
        if (screenfull.enabled) {
            screenfull.request();
        }
    };
    onStartButtonClick = () => {
        this.refTextScroller.current.scroll()
    };
    onTextInputChange = (event) => {
        this.setState({text: event.target.value})
    };
    onFontSizeInputChange = (event, value) => {
        this.setState({fontSize: value})
    };
    onSpeedInputChange = (event, value) => {
        this.setState({scrollSpeed: value})
    };
    onFlipXSwitchChange = (event) => {
        this.setState({flipX: event.target.checked})
    };
    onFlipYSwitchChange = (event) => {
        this.setState({flipY: event.target.checked})
    };

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            fontSize: .5,
            scrollSpeed: .5,
            flipX: false,
            flipY: false
        };

        this.refTextScroller = React.createRef();
        this.refApp = React.createRef();
    }

    render() {
        const {text, fontSize, scrollSpeed, flipX, flipY} = this.state;

        return <div ref={this.refApp} className={styles.app}>
            <header className={styles.header}>
                <div className={styles.controls}>
                    <FormControlLabel
                        control={
                            <TextField
                                placeholder='Enter script.'
                                value={text}
                                onChange={this.onTextInputChange}/>
                        }
                        label={<Description/>}/>
                    <FormControlLabel
                        control={<Slider min={0} max={1} value={scrollSpeed} onChange={this.onSpeedInputChange}/>}
                        label={<FastForward/>}/>
                    <FormControlLabel
                        control={<Slider min={0} max={1} value={fontSize} onChange={this.onFontSizeInputChange}/>}
                        label={<TextFields style={{transform: 'scaleX(-1)'}}/>}/>
                    <FormControlLabel
                        control={<Switch onChange={this.onFlipYSwitchChange}/>}
                        label={<SwapVert/>}/>
                    <FormControlLabel
                        control={<Switch onChange={this.onFlipXSwitchChange}/>}
                        label={<SwapHoriz/>}/>
                    <Button onClick={this.onStartButtonClick} variant='raised'>Start</Button>
                    <Button onClick={this.onFullScreenButtonClick} size='small' variant='raised'><Fullscreen/></Button>
                    <a className={styles.githubLink}
                       href='https://github.com/kevinhwang/teleprompter'
                       target='_blank'
                       rel='noopener noreferrer'>
                        <FontAwesomeIcon icon={faGithub}/>
                    </a>
                </div>
            </header>
            <TextScroller
                ref={this.refTextScroller}
                text={text}
                fontSize={`${(6 * fontSize) + 2}em`}
                flipX={flipX}
                flipY={flipY}
                scrollDurationLine={8000 * (1 - scrollSpeed) + 192}/>
        </div>
    }
}
