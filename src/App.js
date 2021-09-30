import * as React from 'react';
import './App.css';
import Box from '@material-ui/core/Box';
import FormDialog from './integerModal';
import Button from '@material-ui/core/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "firebase/database";
import firebase from './Firebase';



 class AppDragDropDemo extends React.Component {
   
    initializingTask = () => {
        let temp = [];
        for(var x = 0;x <= 25; x++) {
            let obj = {
                id : String.fromCharCode(65 + x), 
                category : "sitting"
            };
            temp.push(obj);
        }
        return temp;
    };

    state = {
        tasks: this.initializingTask(), 
        symbols : [
            {
                id : '<', 
                category : 'sign'
            }, {
                id : '>', 
                category : 'sign'
            }
        ], 
        numArray : [
            {
                id : 'integer', 
                category : 'numbers'
            }
        ],
        open : false, 
        handleClickOpen : this.handleClickOpen, 
        handleClose : this.handleClose, 
        results : [], 
        myNum : 0
    };

    onSubmit = (a) => {
        firebase.database().ref(`alphabet/${a[0].key}`).on("value", data => {
            let temp = data.val().value;
            if(a[1].key === '<') {
                temp = temp.filter(i => {return (i < this.state.myNum);});
            } else {
                temp = temp.filter(i => {return (i > this.state.myNum);});
            }
            this.setState({
                ...this.state, 
                results : temp
            });
        });
        for(let x=0;x<this.state.results.length;x++)
        {
            console.log(this.state.results[x]);
        }
    };

    onDragStart = (ev, id) => {
        console.log('dragstart:',id);
        ev.dataTransfer.setData("id", id);
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    setMyNum = (e) => {
        let myNum = e.target.value;
        this.setState({
            ...this.state, 
            myNum
        });
    }

    onDrop = (ev, cat) => {
       let id = ev.dataTransfer.getData("id");
       
       let tasks = this.state.tasks.filter((task) => {
           if (task.id === id) {
               task.category = cat;
           }
           return task;
       });

       let symbols = this.state.symbols.filter((task) => {
        if (task.id === id) {
            task.category = cat;
        }
        return task;
        });

        let numArray = this.state.numArray.filter((task) => {
            if (task.id === id) {
                task.category = cat;
            }
            return task;
            });

       this.setState({
           ...this.state,
           tasks, 
           symbols, 
           numArray
       });

       if(id === 'integer') {
        console.log("opening modal");
        let open = true;
        this.setState({
            ...this.state, 
            open
        });
        console.log("state", this.state.open);
    }
    }
     handleClickOpen = () => {
        this.setState({
            ...this.state, 
            open : true
        });
      };
    
       handleClose = () => {
        this.setState({
            ...this.state, 
            open : false
        })
      };
        
         
    render() {
        var tasks = {
            sitting: [],
            removed: [], 
            sign: [], 
            numbers : []
        }

        this.state.tasks.forEach((t) => {
            tasks[t.category].push(
                <div key={t.id} 
                    onDragStart = {(e) => this.onDragStart(e, t.id)}
                    draggable
                    className="draggable"
                >
                    {t.id}
                </div>
            );
        });

        this.state.symbols.forEach((t) => {
            tasks[t.category].push(
                <div key={t.id} 
                    onDragStart = {(e) => this.onDragStart(e, t.id)}
                    draggable
                    className="draggable"
                >
                    {t.id}
                </div>
            );
        });

        this.state.numArray.forEach((t) => {
            tasks[t.category].push(
                <div key={t.id} 
                    onDragStart = {(e) => this.onDragStart(e, t.id)}
                    draggable
                    className="integer"
                >
                    {t.id}
                </div>
            );
        });

        return (
            <div style={{ width: '100%'}}>
               {/*this is container box */}
               <FormDialog setMyNum={this.setMyNum} open={this.state.open} handleClickOpen={this.handleClickOpen} handleClose={this.handleClose} />
            <Box
                display="flex"
                flexWrap="wrap"
                alignContent="flex-start"
                p={1}
                m={30}
                bgcolor="grey.300"
                sx={{ maxWidth: 1000, height: 1200 }}
            >

                <div style={{ width: '100%'}} onDragOver={(e)=>this.onDragOver(e)}>
                    {/*this is box is holding alphabet */}
                    <Box
                    bgcolor="white"
                    sx={{ maxWidth: 1000, height: 100 }}
                    p={1}
                    m={1}
                    display="flex"
                    flexDirection="row"
                    overflow="auto"
                    >
                    { tasks.sitting?.map((data) => (
                            <>
                                <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                >
                                <div>{data}</div>  
                                </Box>
                            </>
                            ))
                   }
                   </Box>
                </div>
                <div style={{ width: '100%'}} onDragOver={(e)=>this.onDragOver(e)}>
                     {/*this is box is sign and numbers */}
                    <Box
                       display="flex"
                       alignItems="flex-end"
                       p={1}
                       m={1}
                       bgcolor="white"
                       sx={{ height: 100 }}             
                    >
                        { tasks.sign?.map((data) => (
                            <>
                                <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                >
                                <div>{data} </div>
                                </Box>
                            </>
                            ))
                        }
                        { tasks.numbers?.map((data) => (
                            <>
                                <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                className="integer"
                                >
                                <div>{data} </div>
                                </Box>
                            </>
                            ))
                        }
                    </Box>
                </div>
                <div style={{ width: '50%', margin:"auto"}}  className="drag">
                        Drop Below
                </div>    
        <div style={{ width: '100%' }}  onDrop={(e)=>this.onDrop(e,"removed")} onDragOver={(e)=>this.onDragOver(e)}>
                <Box
            display="flex"
            alignItems="flex-start"
            p={10}
            m={6}
            className="droppable"
            flexDirection="row"
            overflow="auto"
            sx={{ height: 100 }}>
                { tasks.removed?.map((data) => {
                    if(data.key === 'integer') {
                        return (
                            <>
                                <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center">

                                <div className="integer">{this.state.myNum} </div>
                                </Box>
                            </>
                        );
                    } else {
                        return (
                            <>
                                <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                >
                                <div>{data} </div>
                                </Box>
                            </>
                        );
                    }
                })
                }
            </Box>
        </div>
            
            <div style={{ width: '50%',margin:"auto"}} className="submit">
            <Button variant="contained" color="primary" className="button"  onClick={() => this.onSubmit(tasks.removed)} >
            Submit
            </Button>
            </div> 

            <div style={{ width: '80%',height:'35%',margin:"auto"}} className="table"> 
            <TableContainer component={Paper} sx={{minWidth:"50%"}}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Character</TableCell>
            <TableCell align="right">Values</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {(this.state.results.map((row) => (
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {tasks.removed[0].key}
              </TableCell>
              <TableCell align="right">{row}</TableCell>
            </TableRow>
          )))}
        </TableBody>
      </Table>
    </TableContainer>
            </div>
        </Box>
        </div>
        );
    }
}

export default AppDragDropDemo;