import React from 'react';
import axios from "../axios";
import MyNavbar from '../components/MyNavbar';
import Header from '../components/Header';
import { Redirect } from "react-router-dom";
import  { components } from 'react-select';
import fetch from 'isomorphic-fetch';
import * as _ from "lodash";
import Async from 'react-select/lib/Async';


class PostList extends React.Component {
    state = {
        id: [],
        posterUri: [],
        value: [],
    }


    onChange = (value) => {
        this.setState({
            value_1: value,
        });
        let arr_id = [...this.state.id];
        let arr_posterUri = [...this.state.posterUri];
        let arr_value = [...this.state.value];

        arr_id.push(value ? value.id : '');
        arr_posterUri.push(value ? value.posterUri : '');
        arr_value.push(value ? value : '')

        this.setState({
            id: arr_id,
            posterUri: arr_posterUri,
            value: arr_value,
        });
    }

    clear = (index) => {

        let arr_id = [...this.state.id];
        let arr_posterUri = [...this.state.posterUri];
        let arr_value = [...this.state.value];

        arr_id.splice(index, 1);
        arr_posterUri.splice(index, 1)
        arr_value.splice(index, 1)
        this.setState({
            id: arr_id,
            posterUri: arr_posterUri,
            value: arr_value,
        });
    }
    debouncedFetch = _.debounce((searchTerm, callback) => {
        return fetch(`http://localhost:6969/api/movies/?content=${searchTerm}`)
            .then((result) => { return result.json() })
            .then(json => {
                this.setState({ movies: json })
                callback(json)
            })
            .catch((error) => callback(error, null));
    }, 500)

    getMovie = (input, callback) => {
        if (!input) {
            return callback(null, { options: [] });
        }
        this.debouncedFetch(input, callback)

    }


    handleChangeText = async (e) => {
        await this.setState({
            name: e
        })

    }
    submitMovie = (e) => {

        if (this.state.name && this.state.posterUri.length === 6 && this.state.id.length === 6) {
            e.preventDefault();
            axios.post('/api/lists', {
                moviesId: this.state.id,
                posterUri: this.state.posterUri,
                name: this.state.name,
            })
                .then(data => {
                    this.setState({ switch: true, id: data.data._id });
                    // log
                })
                .catch(err => console.log(err))
        }
    }
    renderValue = (option) => {
        return <strong >{option.title}</strong>;
    }



    render() {
        // if (this.state.switch) {
        //     return <Redirect to={`/lists/${this.state.id}`} />
        // }

        const Option = (props) => {            
            const option = { ...props.data };
            console.log(props)
            return (
                <div className="searchMovie" ref={props.innerRef} {...props.innerProps}>
                    <img src={option.posterUri !== 'https://image.tmdb.org/t/p/w500null' ? option.posterUri : 'https://vnkings.com/wp-content/uploads/2018/01/unknown_01.jpg'} style={{ width: '100px', height: 'auto' }} />
                    <div className="searchMovie-detail">
                        <p style={{ fontWeight: 'bold', paddingLeft: '10px' }} >{option.title}</p>
                        <p style={{ fontSize: '12px', paddingLeft: '10px' }} ><span style={{ fontWeight: 'bold', fontSize: '13px' }} >Nội dung : </span>  {option.overview.substr(0, 100) + '...'}</p>
                        <p style={{ fontSize: '13px', paddingLeft: '10px' }} > <span style={{ fontWeight: 'bold', fontSize: '13px' }} >IDMB : </span>{option.vote_average}</p>
                    </div>
                </div>
            )
        }


        const post_arr = Array.apply(null, Array(6)).map((value, index) => {
            return (
                this.state.id[index]
                    ? (
                        <div key={index}>
                            <h4 style={{ color: '#428BCA' }}>#{index + 1} </h4>
                            <div key={index} className="row" style={{
                                marginTop: '10px', marginLeft: 'auto',
                                marginRight: 'auto', border: '1px solid #bababa', borderRadius: '4px',
                                height: 'auto',
                                display: 'flex',
                                flexDirection: 'row', alignItems: 'start',
                                justifyContent: 'start',
                                position: 'relative'
                            }}>
                                <i className="fas fa-times" onClick={this.clear.bind(this, index)} style={{
                                    position: 'absolute',
                                    right: '0'
                                }}></i>
                                <img alt="111" src={this.state.posterUri[index]} style={{ width: '100px', height: 'auto', margin: '10px' }} />
                                <div className="searchMovie-detail" style={{ marginTop: '10px', }}>
                                    <p style={{ fontWeight: 'bold', paddingLeft: '10px' }} >{this.state.value[index].title}</p>
                                    <p style={{ fontSize: '12px', paddingLeft: '10px' }} ><span style={{ fontWeight: 'bold', fontSize: '13px' }} >Nội dung :  </span>  {this.state.value[index].overview.substr(0, 100) + '...'}</p>
                                    <p style={{ fontSize: '13px', paddingLeft: '10px' }} > <span style={{ fontWeight: 'bold', fontSize: '13px' }} >IDMB : </span>{this.state.value[index].vote_average}</p>
                                </div>
                            </div>
                        </div>
                    )
                    :
                    (
                        <div className="section" key={index}>
                            <h4 style={{ color: '#428BCA' }}>#{index + 1} </h4>
                            <Async
                                loadOptions={this.getMovie} //input tra ve json
                                components={{ Option }}
                                onChange={this.onChange} // set cai sau khi minh
                                placeholder='Enter movie title , credits ..'
                                getOptionLabel={({ title }) => title}
                                cacheOptions
                                defaultOptions
                                closeMenuOnSelect={false}
                                required
                            />
                        </div>
                    )
            )
        })
        return (
            <div className="container-fluid">
                <Header username={this.props.username} id={this.props.id} />
                <MyNavbar username={this.props.username} id={this.props.id} />
                <div className="paddingHard" >
                    <form className="form-group">
                        <div className="rule">
                            <div className="row">
                                <div className="col-ms-12 col ms-12 col-md-4 "  >
                                    <h4 style={{ color: '#D93433', padding: '0' }}>Enter list's name</h4>
                                    <input style={{ marginTop: '10px' }} className="form-control" required onChange={e => this.handleChangeText(e.target.value)} />
                                    {/* <div className="alert alert-danger" style={{ marginTop: '20px' }}>
                                        <strong><i className="fas fa-exclamation-triangle"></i>1 - Warning !</strong> No racist content or offend toward person or group

                                        </div>
                                    <div className="alert alert-info">
                                        <strong><i className="far fa-frown"></i></strong> We really try to
                                         cover as much movies as we can but of course we still missing
                                      a lot so if you find one , please contact us by email or facebook <a style={{ cursor: 'pointer', color: 'black', textDecoration: 'underline' }}> here </a>
                                      so we can add it to our database <i className="far fa-heart"></i>
                                    </div> */}
                                </div>
                                <div className=" col-ms-12 col ms-12 col-md-8">
                                    {post_arr}
                                </div>
                            </div>
                            <button className="btn btn-danger" onClick={this.submitMovie} style={{ marginTop: '30px', width: '200px', height: '40px', fontSize: '15px', fontWeight: 'bold' }}>Đăng list </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default PostList;
