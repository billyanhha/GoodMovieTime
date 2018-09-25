import React, { PureComponent } from 'react';
import Slider from 'react-slick'
const inter = require('../images/inter.jpg');
const devil = require('../images/devil.jpg');
const movie = require('../images/cinema.jpg');
const justiceleague = require('../images/justiceleague.jpg');


class Slide extends React.Component {
    render() {
        const settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000
        };
        return (
            <div className="slide" >
                <Slider {...settings}>
                    <div className="d-none d-sm-block">
                        <div className="imageSlide" style={{ backgroundImage: `url(${devil})` }} >
                            <div style={{
                                padding: '15%',
                                paddingTop: "5%"

                            }}>
                                <p className="slideText" >- Play with devil -</p>
                            </div>
                        </div>
                    </div>
                    <div className="d-none d-sm-block">
                        <div className="imageSlide" style={{ backgroundImage: `url(${inter})` }} >
                            <div style={{
                                paddingLeft: '60%',
                                paddingTop: "5%"
                            }}>
                                <p className="slideText" >- Discover new land with us -</p>
                            </div>
                        </div>
                    </div>
                    <div className="d-none d-sm-block">
                        <div className="imageSlide" style={{ backgroundImage: `url(${movie})` }} >
                        </div>
                    </div>
                    <div className="d-none d-sm-block">
                        <div className="imageSlide" style={{ backgroundImage: `url(${justiceleague})` }} >
                            <div style={{
                                padding: '20%'
                            }}>
                                <p className="slideText" >- Stand together , protect justice -</p>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div >
        )
    }
}

export default Slide;