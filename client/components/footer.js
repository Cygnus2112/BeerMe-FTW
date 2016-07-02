import React from 'react'

class Footer extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return ( 
      <div>
        <footer>
            <div className='foot'>
              <span>&nbsp;&nbsp; © Thomas Leupp 2016 </span>
              <a href="https://github.com/Cygnus2112" target="_blank"><i className="icon fa fa-github"></i></a>&nbsp;
              <a href="https://www.linkedin.com/in/thomasleupp" target="_blank"><i className="icon fa fa-linkedin"></i></a>
            </div>
        </footer>
      </div>
    )
  }
}

export default Footer;