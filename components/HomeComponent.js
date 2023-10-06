import React, { useState } from 'react'
import Card from '../components/Card'
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import config from '../config';
  
const HomeComponent = ({products, cartTrace, setCarttrace, loading, keywords}) => {
  const baseUrl = config.bUrl;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [details, setDetails] = useState(null)

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    const addToCart = (item) => {
        let products = [];
        if(localStorage.getItem('cartData')){
            products = JSON.parse(localStorage.getItem('cartData'));
        }


        if(products?.filter(itm => itm.id === item.id).length > 0)
        {
            toast.error("Product Alredy In Cart!")
        }else{
          
            const cartpro = {
                id: item?.id,
                name: item?.name,
                qty: 1,
                price: item?.price,
                image: item?.image
            }
            products.push(cartpro);
            localStorage.setItem('cartData', JSON.stringify(products));
            toast.success("Successfully Added to Cart")
            setCarttrace(cartTrace + 1)
        }
       
    }

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: "50%"
        },
      };



  return (
   <>
     <div className="py-3 py-md-5 bg-light">
        <div className="container">
            <div className="row">
            <div className="col-md-12">
                <h4 className="mb-4"> {keywords != "" ?`${products?.length} results for keywords ${keywords}`  : 'Our Products'} </h4>
            </div>

              {loading ? (
                <div style={{ width: '100%', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={`/images/loading.gif`} alt="" />
                </div>
              ) : (
                <>
                   { products?.map((item) => (
                        <div className="col-md-3" key={`item-${item?.id}`}>
                            <Card item={item} openModal={openModal} setDetails={setDetails} addToCart={addToCart} />
                        </div>
                  )) }
                </>
              )}
               

            </div>
        </div>
    </div>

    <Modal
    isOpen={modalIsOpen}
    onAfterOpen={afterOpenModal}
    onRequestClose={closeModal}
    style={customStyles}
    ariaHideApp={false}
    contentLabel="Example Modal"
    >
    <div className="row">
        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <span onClick={closeModal} style={{ cursor: 'pointer' }} >X</span>
        </div>
      <div className="col-md-6 product_img">
        <img
          src={baseUrl+details?.image}
          className="img"
          style={{ width: 300 }}
        />
      </div>
      <div className="col-md-6 product_content">
        <h4>
          {details?.name}
        </h4>
        <div className="rating">
          <span className="glyphicon glyphicon-star" />
          <span className="glyphicon glyphicon-star" />
          <span className="glyphicon glyphicon-star" />
          <span className="glyphicon glyphicon-star" />
          <span className="glyphicon glyphicon-star" />
        </div>
        <p>
          {details?.description}
        </p>
        <h3 className="cost">
          <span className="glyphicon glyphicon-usd" /> ${details?.price}
          {/* <small className="pre-cost">
            <span className="glyphicon glyphicon-usd" /> 60.00
          </small> */}
        </h3>
        <div className="row">
        
          {/* end col */}
          
          {/* end col */}
          {/* <div className="col-md-4 col-sm-12">
            <select className="form-control" name="select">
              <option value="" selected="">
                QTY
              </option>
              <option value="">1</option>
              <option value="">2</option>
              <option value="">3</option>
            </select>
          </div> */}
          {/* end col */}
        </div>
        <div className="space-ten" />
        <div className="btn-ground mt-2">
          <button type="button" className="btn btn-primary" onClick={() => addToCart(details)} >
            <span className="glyphicon glyphicon-shopping-cart" /> Add To Cart
          </button>
          
        </div>
      </div>
    </div>

    </Modal>
   </>

  )
}

export default HomeComponent