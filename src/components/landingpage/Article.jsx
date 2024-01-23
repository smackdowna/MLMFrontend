import React from 'react'
import '../../App.css'

const Article = () => {
  return (
    <section className="container">
      <div className="article">
        <h2 className="article-title">ARTICLE</h2>
        <p className="article-content">
          Updating Soon....
        </p>

        <div className="article-card-wrapper">
          <div className="article-card">
            <div className="article-card-image"></div>
            <div className="article-card-title"></div>
            <div className="article-card-label"></div>
            <div className="article-card-description"></div>
            <div className="article-card-btn-wrapper"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Article