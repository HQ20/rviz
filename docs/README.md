# Headline

> An awesome project.

```jsx
/*react*/
<desc>
Hello `world`
* a
* b
</desc>
<style>
  .author {
    color: #ff0000cc;
  }
</style>
<script>
  export default class Application extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        color: 'blue'
      }
      this.globalVariable = globalVariable
    }
    render() {
      return (
        <div>
          <VoroniArcMap width={980} height={540} />
          <div className='wrapper' ref={el => this.el = el}>
            <div>
            <p className='author'>author: {this.globalVariable}</p>
            <button style={{color: this.state.color}} className='test' onClick={e => {alert('author: ' + this.globalVariable); this.setState({color: 'red'})}}>test</button>
            </div>
          </div>
        </div>
      )
    }
  }
```