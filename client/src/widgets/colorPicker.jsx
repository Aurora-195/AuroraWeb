'use strict'

import React from 'react'
import reactCSS from 'reactcss'
import { CirclePicker } from 'react-color'

class ColorPicker extends React.Component {
  state = {
    displayColorPicker: false,
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  render() {
    
    const { color, onColorChange } = this.props;

    const styles = reactCSS({
      'default': {
        color: {
          width: '15px',
          height: '15px',
          borderRadius: '100px',
          background: `rgba(${ color.r }, ${ color.g }, ${ color.b }, ${ color.a })`,
        },
        swatch: {
          padding: '4px',
          background: '#fff',
          borderRadius: '100px',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    const auroraColors = [
      '#FF5252', // Red
      '#FFD740', // Yellow
      '#FF4081', // Pink
      '#FFAB40', // Orange
      '#3AE425', // Green
      '#03A9F4', // Light Blue
      '#E91E63', // Magenta
      '#FF9800', // Amber
      '#2196F3', // Blue
      '#4CAF50', // Teal Green
      '#CD1CF1', // Purple
      '#FF5722', // Deep Orange
    ];

    return (
      <div>
        <div style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color } />
        </div>

        { 
        this.state.displayColorPicker ? 

        <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.handleClose }/>
          <div className='bg-white p-4 rounded-md shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-85'>
            <CirclePicker color={ color } onChange={ onColorChange } colors={ auroraColors }/>
          </div>

        </div> : null 

        }

      </div>
    )
  }
}

export default ColorPicker