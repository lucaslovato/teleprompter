// TODO: Replace this class with Slider implementation coming in v1 (https://github.com/mui-org/material-ui/issues/4793)

import React from 'react'
import {Slider as SliderV0} from 'material-ui'
import {darkBaseTheme, getMuiTheme, MuiThemeProvider} from 'material-ui/styles'
import styles from './Slider.module.css'

const theme = getMuiTheme(darkBaseTheme);
const sliderStyle = {margin: 0};

export default (props) => <MuiThemeProvider muiTheme={theme}>
    <div className={styles.sliderContainer}>
        <SliderV0 sliderStyle={sliderStyle} {...props}/>
    </div>
</MuiThemeProvider>;