import React from 'react'
import PopperUnstyled from '@mui/base/PopperUnstyled'
import Button from '@mui/material/Button'
import ClickAwayListener from '@mui/base/ClickAwayListener'
import TextField from '@mui/material/TextField'

export default function FilterPopper() {
  const anchor_el = React.useRef()
  const [popper_open, set_popper_open] = React.useState(false)

  return (
    <>
      <ClickAwayListener onClickAway={() => set_popper_open(false)}>
        <>
          <Button
            variant='text'
            size='small'
            ref={anchor_el}
            onClick={() => set_popper_open(!popper_open)}>
            Filter
          </Button>
          <PopperUnstyled
            anchorEl={anchor_el.current}
            open={popper_open}
            placement='bottom'
            modifiers={[
              {
                name: 'offset',
                options: {
                  offset: [0, 8]
                }
              }
            ]}>
            <div style={{ border: '1px solid' }}>
              <TextField label='Filter' />
            </div>
          </PopperUnstyled>
        </>
      </ClickAwayListener>
    </>
  )
}
