import React from 'react';
import Slider from 'react-slick'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import config from "../config";
import LinearProgress from '@material-ui/core/LinearProgress'; const inter = require('../images/inter.jpg');
const devil = require('../images/watch.jpg');
const batlogo = require('../images/batlogo.png');
const ctb = require('../images/ctb.jpg');
const chow = require('../images/chow.jpg');
const jlb = require('../images/jlb.png');
const dkb = require('../images/dkb.jpg');
const gdb = require('../images/gdb.png');
const captainMarvel = require('../images/captainMarvel.png');
const justiceleague = require('../images/justiceleague.jpg');
const teentitan = require('../images/teentitan.png');


class Slide extends React.Component {

    state = {
        nav1: null,
        nav2: null,
        slideIndex: 0,
        completed: 0
    }

    navTosLide = (index) => {
        this.slider.slickGoTo(index);
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
        this.setState({ completed: 0 });
        setTimeout(() => {
            this.setState({ completed: 100 });
        }, 2000);
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

        return (
            <div className="slide" >
                <Slider {...settings}
                    swipeToSlide={false}
                    ref={slider => (this.slider = slider)}>
                    <div className="container-fluid">
                        <div className="imageSlide" style={{ backgroundImage: `url(${ctb})` }} >
                            <div className="linear">
                                <img alt="1" src={captainMarvel} className="slideLogoImage" />
                                <p className="releaseDate">TRAILER REALEASE</p>
                                <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/watch?v=r9WhJyyTtqo" className="slideButton" > Watch trailer </a>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid" >
                        <div className="imageSlide" style={{ backgroundImage: `url(${devil})` }}>
                            <div className="linear">
                                <img alt="1" src={teentitan} className="slideLogoImage" />
                                <p className="releaseDate">THIS SUNDAY AT 6PM</p>
                                <p className="content">The cast and creative minds spill the deets on the importance of rising<br />
                                    up and tackling adversity ahead of this weekend's
                                premiere on<br />
                                    Disney Channel and Disney XD!</p>
                                <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/watch?v=r9WhJyyTtqo" className="slideButton" > Watch trailer </a>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="imageSlide" style={{ backgroundImage: `url(${dkb})` }} >
                            <div className="linear">
                                <img alt="1" src={batlogo} className="slideLogoImage" />
                                <p className="releaseDate">The legend talk</p>
                                <p className="content">Greatest super movie of all time</p>
                                <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/watch?v=r9WhJyyTtqo" className="slideButton" > Watch trailer </a>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="imageSlide" style={{ backgroundImage: `url(${justiceleague})` }} >
                            <div className="linear">
                                <img alt="1" src={jlb} className="slideLogoImage" />
                                <p className="releaseDate">Biggest DC movies</p>
                                <p className="content">All you need is justice</p>
                                <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/watch?v=r9WhJyyTtqo" className="slideButton" > Watch trailer </a>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="imageSlide" style={{ backgroundImage: `url(${chow})` }} >
                            <div className="linear">
                                <p className="releaseDate">Chow's world</p>
                                <p className="content">Best comedy movie i've ever watched so far</p>
                                <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/watch?v=r9WhJyyTtqo" className="slideButton" > Watch trailer </a>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="imageSlide" style={{ backgroundImage: `url(${gdb})` }} >
                            <div className="linear">
                                <p className="releaseDate">PROTECT THE GALAXY</p>
                                <p className="content">The funniest superheros gang</p>
                                <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/watch?v=r9WhJyyTtqo" className="slideButton" > Watch trailer </a>
                            </div>
                        </div>
                    </div>
                </Slider>
                <div className="navSlide">
                    <div className="navSlideItem">
                        {
                            this.state.slideIndex === 0 && (
                                <LinearProgress variant="determinate" value={this.state.completed} />
                            )
                        }
                        <p onClick={() => this.navTosLide('0')} className={this.state.slideIndex === 0 ? "slideNavTextClick" : "slideNavText"} >Teen titan go</p>
                    </div>
                    <div className="navSlideItem" >
                        {
                            this.state.slideIndex === 1 && (
                                <LinearProgress variant="determinate" value={this.state.completed} />
                            )
                        }
                        <p onClick={() => this.navTosLide('1')} className={this.state.slideIndex === 1 ? "slideNavTextClick" : "slideNavText"} >Captain marvel</p>
                    </div>
                    <div className="navSlideItem" >
                        {
                            this.state.slideIndex === 2 && (
                                <LinearProgress variant="determinate" value={this.state.completed} />
                            )
                        }
                        <p onClick={() => this.navTosLide('2')} className={this.state.slideIndex === 2 ? "slideNavTextClick" : "slideNavText"} >The dark night rises</p>
                    </div>
                    <div className="navSlideItem" >
                        {
                            this.state.slideIndex === 3 && (
                                <LinearProgress variant="determinate" value={this.state.completed} />
                            )
                        }
                        <p onClick={() => this.navTosLide('3')} className={this.state.slideIndex === 3 ? "slideNavTextClick" : "slideNavText"} >Justice league</p>
                    </div>
                    <div className="navSlideItem" >
                        {
                            this.state.slideIndex === 4 && (
                                <LinearProgress variant="determinate" value={this.state.completed} />
                            )
                        }
                        <p onClick={() => this.navTosLide('4')} className={this.state.slideIndex === 4 ? "slideNavTextClick" : "slideNavText"} >Kungfu master</p>
                    </div>
                    <div className="navSlideItem" >
                        {
                            this.state.slideIndex === 5 && (
                                <LinearProgress variant="determinate" value={this.state.completed} />
                            )
                        }
                        <p onClick={() => this.navTosLide('5')} className={this.state.slideIndex === 5 ? "slideNavTextClick" : "slideNavText"} >The guardian of the galaxy voi 3</p>
                    </div>
                </div>
            </div >
        )
    }
}

export default (Slide);

