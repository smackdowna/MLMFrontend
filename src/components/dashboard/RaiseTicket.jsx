import React, { useState } from 'react';
import '../../styles/innerScreen/styles.css'
import { createTicket } from '../../api/user';
import { toast } from 'react-toastify';

const RaiseTicket = () => {
  const [query, setQuery] = useState('');
  // const [image, setImage] = useState(null);


  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  // const handleImageChange = (event) => {
  //   setImage(event.target.files[0]);
  // };

  const handleSubmit = async () => {
    try {
      const res = await createTicket({
        query,
      });
      console.log(res);
      toast.success(res.message);
    } catch (error) {
      toast.error(error?.data?.message || 'Error while raising query!');
    } finally {
      setQuery('');
      // setImage(null);
    }
  };

  return (
    <>
      <section className='header-wrapper'>
        <h1 className="main-title">Raise a Ticket</h1>
        <div className="main-content">
          <div className="form-wrapper">
            <form className='raise-query-form'>
              <div className="input-wrapper">
                <label className="query" htmlFor="query">Write your query here:</label>
                <textarea
                  id="query"
                  name="query"
                  value={ query }
                  onChange={ handleQueryChange }
                  placeholder='Type something here'
                  rows="20"
                  required
                />
              </div>
              {/* <div className="input-wrapper">
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept='image/*'
                  onChange={ handleImageChange }
                />
                <label htmlFor="image">
                  <span className='uploadIcon'>
                    <img src="/assets/icons/attachfile.svg" alt="Upload" />
                  </span>
                  <span>Attach any image file like .jpg, .png</span>
                </label>
              </div> */}
            </form>
            <button className="confirm-btn" type="button" onClick={ handleSubmit }>Raise Ticket</button>
          </div>
        </div>
      </section>
    </>
  )
}

export default RaiseTicket