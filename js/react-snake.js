var snake = function () {

	var SnakeTableCell = React.createClass({
		render: function() {
      return (
      	<span className="snake-table-cell">	
      	</span>
      );
    }
	});

	var SnakeTable = React.createClass({
	  render: function() {
	  	let row = this.props.row || 10;
	  	let col = this.props.col || 10;

      var table = [];
      var tr = [];

			for (let i=0; i < col; i++) {
			  tr.push(<td><SnakeTableCell/></td>);
			}

			for (let i=0; i < row; i++) {
			  table.push(<tr><td>{tr}</td></tr>);
			}			

      return (
      	<table>      	
        	{table}
      	</table>
      );
    }
	});

	var ControlPanel = React.createClass({
	  render: function() {
      return (
      	<div>   
  				<input type="radio" className="" name="gender" value="Low" onClick={this.props.gameControl({"speed":0})}/> Low
  				<input type="radio" className="" name="gender" value="Mid" onClick={this.props.gameControl({"speed":1})}/> Mid
  				<input type="radio" className="" name="gender" value="Hig" onClick={this.props.gameControl({"speed":2})}/> Hig
      		<button type="button" className="" onClick={this.props.gameControl({"speed":0})}>Start Game</button>
      	</div>
      );
    }
	});

	var SnakeGame = React.createClass({
		getInitialState: function() {
      return {
        palse: true,
        col:20,
        row:10,
        speed: ''
      }
    },
    gameControl:function(obj){
    	console.error("test");
    },
	  render: function() {
      return (
			  <div>
			    <SnakeTable 
			    	row={this.state.row} 
			    	col={this.state.col}
			    	speed={this.state.speed}/>

			    <ControlPanel
			    	gameControl={this.gameControl}/>
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