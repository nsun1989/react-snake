var snake = function () {

	var SnakeTableCell = React.createClass({
		render: function() {
			let className = (this.props.cellOccupied) ? "snake-table-cell occupy-cell" :  "snake-table-cell" 
      return (
      	<span className={className} >	
      	</span>
      );
    }
	});

	var SnakeTable = React.createClass({
	  render: function() {
	  	let row = this.props.controlObj.row || 10;
	  	let col = this.props.controlObj.col || 20;

	  	let snake = this.props.controlObj.snake || {};

      var table = [];
      let tr = [];

      let index = -1;
      console.error(snake.body);

			for (let i=0; i < row; i++) {
				let tr = [];				
				for (let j=0; j < col; j++) {
					index++;					
					if (snake.body && snake.body[index] === 1){
						tr.push(<td><SnakeTableCell cellOccupied={true} /></td>);
					}else{
						tr.push(<td><SnakeTableCell cellOccupied={false} /></td>);
					}				  
				}				
			  table.push(<tr>{tr}</tr>);
			}			

      return (
      	<table>   
      		<tbody>     	
        		{table}
        	</tbody>
      	</table>
      );
    }
	});

	var ControlPanel = React.createClass({
	  render: function() {
      return (
      	<div>   
  				<input type="radio" className="" name="gender" value="Low" onClick={() => this.props.updateStates("speed",0)}/> Low
  				<input type="radio" className="" name="gender" value="Mid" onClick={() => this.props.updateStates("speed",1)}/> Mid
  				<input type="radio" className="" name="gender" value="Hig" onClick={() => this.props.updateStates("speed",2)}/> Hig
      		<button type="button" className="" onClick={()=> this.props.startGame()}>Start Game</button>
      	</div>
      );
    }
	});

	var SnakeGame = React.createClass({
		getInitialState: function() {
      return {
      	controlObj : {
          palse: true,
          intervalId: 0,
	        col:20,
	        row:10,
	        speed: 0,
	        direction:0,
	        snake:{
	        	queue: [1,2],
	        	body: {
	        		1 : 1,
	        		2 : 1
	        	}
	        }

      	}
      }
    },
		handleKeyDown(event){
	    //right
	    if(event.keyCode == 39){
	      this.snakeDirection(0);
	    }
	    //down
	    else if(event.keyCode == 40){
	    	this.snakeDirection(1);
	    }
	    //left
	    else if(event.keyCode == 37){
	    	this.snakeDirection(2);
	    }
	    //up
	   	else if(event.keyCode == 38){
	   		this.snakeDirection(3);
	    }
		},
		componentWillMount() {
			console.error("componentWillMount");
	    window.addEventListener('keydown', this.handleKeyDown);
	  },
	  componentWillUnmount() {
	    window.removeEventListener('keydown', this.handleKeyDown);
	  },	
    updateStates:function(key, value){
    	let controlObj = this.state.controlObj;
    	controlObj[key] = value;
    	this.setState({"controlObj": controlObj});    	
    },
    snakeDirection(direction){ 
    	curr_dirtion = this.state.controlObj.direction;
    	if(curr_dirtion !== direction && Math.abs(direction - curr_dirtion) % 2 === 1 ){
    		console.error(direction);
    	}  	
    },
    snakeMoving(){   	
    	console.error("start");
    },
    startGame:function(){

    	if(this.state.controlObj.palse){
    		let intervalId = setInterval(this.snakeMoving, 1000);
    		this.updateStates("intervalId", intervalId);
    		this.updateStates("palse", false);
    	}else{
    		clearInterval(this.state.controlObj.intervalId);
    		this.updateStates("palse", true);
    	}
    	
    },
	  render: function() {
      return (
			  <div>
			    <SnakeTable 
			    	controlObj={this.state.controlObj}
			    	updateStates={this.updateStates}/>

			    <ControlPanel
			    	updateStates={this.updateStates}
			    	startGame={this.startGame}/>
			  </div>
      );
    }
	});

	var destination = document.querySelector("#root");
	
	ReactDOM.render(
	  <div>
	    <SnakeGame/>
	  </div>,
	  destination
	);  
}

snake();