import React from 'react';
import '../../App.css'

const About = () => {
  return (
    <div className='about'>
      <div className="about-wrapper">
        <div className="col-1">
          <h2 className='about-title'>
            About <span className='highlight-primary'>Shridham Goshala</span>
          </h2>

          <div className="about-content">
            <p>
              The main objective of Shridham Gaushala Samiti is to strengthen the rural economy by promoting cow conservation. Through Gaushala, maximum employment is to be created by providing a platform for training, manufacturing and distribution of various products related to farming, to increase the income of unemployed and farmers, to promote farming, animal husbandry and organic farming. Since the beginning of the ancient Indian civilization, Mahadev has been sitting with Nandi with him and Shri Hari himself reared a cow and was called Gopal, the same sages have also highlighted the importance of mother cow by mentioning Kamdhenu in the scriptures. In the blind race of development in the new environment, mother cow has been left behind from us,  hence through Shri Gau Dham Gaushala, we have come among the people with such an innovation which can completely destroy many problems of the country and society. is able to
            </p>
            <br />
            <p>
              A suitable article is enough to explain the importance of mother cow for our survival. In the blind race of development in the new environment, mother cow has been left behind from us, the adverse effects of which we are also seeing, hence through Shri Gau Dham Gaushala, we have come among the people with such an innovation which can completely destroy many problems of the country and society.
            </p>
          </div>
        </div>
        <div className="col-2 about-image" >
          {/* <a href="#"> */}
            {/* <img src='/assets/icons/play_button.svg' alt='Play Button' className='play-btn' /> */}
          {/* </a> */}
        </div>
      </div>
    </div>
  )
}

export default About