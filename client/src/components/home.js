import React from "react";
import Root from "./root-page";



const Home = (props)=>{

  return(
    <Root name="home-root"
      title="Book Borrow"
      subtitle="Go ahead and borrow a book. I dare you!"
      >
      <div className="home">
        HOME
      </div>
    </Root>
  )
}

export default Home;
