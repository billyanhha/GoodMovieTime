import React from 'react';
import Slider from 'react-slick'
import config from "../config";
const devil = require('../images/watch.jpg');
const batlogo = require('../images/batlogo.png');
const ctb = require('../images/ctb.jpg');
const chow = require('../images/chow.jpg');
const jlb = require('../images/jlb.png');
const dkb = require('../images/dkb.jpg');
const gdb = require('../images/gdb.png');
const gog = require('../images/g0g.png');
const kungfu = require('../images/kungfu.png');
const captainMarvel = require('../images/captainMarvel.png');
const justiceleague = require('../images/justiceleague.jpg');
const teentitan = require('../images/teentitan.png');
const slider = require('../slider.json');
const navSlide = require('../navSlide.json');

class Slide extends React.Component {

    state = {
        nav1: null,
        nav2: null,
        slideIndex: 0,
        completed: 0
    }

    navTosLide = (index) => {
        this.slider1.slickGoTo(index);
        this.setState({ slideIndex: index })
    }


    componentDidMount() {
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2
        });
        this.progress();
    }

    progress = () => {
        if (this.setState.completed === 100) {
            this.setState({ completed: 0 });
        }
        setTimeout(() => {
            this.setState({ completed: this.state.completed + 100 });
        }, 2);
    };

    render() {
        const settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            swipeToSlide: false,
            autoplay: true,
            pauseonHover: false,
            autoplaySpeed: config.speed,
            beforeChange: (current, next) => {
                this.progress();
                this.setState({ slideIndex: next })
            },
        };
        const slide = slider.map((value, index) => {
            const background = [ctb, devil, dkb, justiceleague, chow, gdb];
            const logo = [captainMarvel, teentitan, batlogo, jlb, kungfu, gog]
            return (
                <div className="container-fluid" key={index}>
                    <div className="imageSlide" style={{ backgroundImage: `url(${background[index]})` }} >
                        <div className="linear padding">
                            <img alt="" src={logo[index] || ''} className="slideLogoImage" />
                            <p className="releaseDate">{value.bigText}</p>
                            <p className="content">{value.details}</p>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/watch?v=r9WhJyyTtqo" className="slideButton" > Watch trailer </a>
                        </div>
                    </div>
                </div>
            )
        })
        const navSlideWeb = navSlide.map((value, index) => {
            const click = () => {
                return this.navTosLide(index);
            }
            return (<div className="navSlideItem" key={index}>
                {
                    this.state.slideIndex === (index) && (
                        <div className="progress-bar"></div>
                    )
                }
                <p onClick={click} className={this.state.slideIndex === (index) ? "slideNavTextClick" : "slideNavText"} >{value.title}</p>
            </div>)
        })
        const movieFontInfo = slider.map((value, index) => {
            const logo = [captainMarvel, teentitan, batlogo, jlb, kungfu, gog]
            return (
                <div className="infoDiv" key={index}>
                    <img alt="" src={logo[index] || ''} className="slideLogoImage" />
                    <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/watch?v=r9WhJyyTtqo" className="slideButton" > Watch trailer </a>
                </div>
            )
        })
        return (
            <div className="slide" >
                <Slider {...settings}
                    swipeToSlide={false}
                    asNavFor={this.state.nav2}
                    ref={slider => (this.slider1 = slider)}>
                    {slide}
                </Slider>
                <div className="navSlide">
                    {navSlideWeb}
                </div>
                <div className="movieInfoPhone" >
                    <Slider {...settings}
                        disable
                        asNavFor={this.state.nav1}
                        swipeToSlide={false}
                        ref={slider => (this.slider2 = slider)}>
                        {movieFontInfo}
                    </Slider>
                </div>
            </div >
        )
    }
}

export default (Slide);

