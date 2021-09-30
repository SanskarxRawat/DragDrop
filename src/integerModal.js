import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default class FormDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open : props.open, 
            handleClickOpen : props.handleClickOpen, 
            handleClose : props.handleClose, 
            setMyNum : props.setMyNum
        }
    }

    componentWillReceiveProps({open}) {
        this.setState({
            ...this.state,
            open
        });
      }


  render() {
    return (
        <div>
          <Dialog open={this.state.open} onClose={this.state.handleClose}>
            <DialogTitle>Enter Your Number Here</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Integer"
                type="number"
                fullWidth
                variant="standard"
                onChange={this.state.setMyNum}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.state.handleClose}>Cancel</Button>
              <Button onClick={this.state.handleClose}>Ok</Button>
            </DialogActions>
          </Dialog>
        </div>
      );
  }
}