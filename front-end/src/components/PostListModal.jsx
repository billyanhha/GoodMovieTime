import React from 'react';
import axios from "../axios";
import { message } from "antd";
import fetch from 'isomorphic-fetch';
import * as _ from "lodash";
import Async from 'react-select/lib/Async';


class PostListModal extends React.Component {
    state = {
        id: [],
        posterUri: [],
        value: [],
    }

    // add movie from react select
    onChange = (value) => {
        let id = [...this.state.id];
        let posterUri = [...this.state.posterUri];

        id.push(value ? value.id : '');
        posterUri.push(value ? value.posterUri : '');
        this.setState({
            id,
            posterUri
        });
    }

    // clear
    clear = (index) => {

        let id = [...this.state.id];
        let posterUri = [...this.state.posterUri];

        id.splice(index, 1);
        posterUri.splice(index, 1)
        this.setState({
            id,
            posterUri
        });
    }

    handleChangeText = async (e) => {
        await this.setState({
            name: e
        })

    }
    submitList = (e) => {
        if (this.state.name && this.state.posterUri.length >= 3) {
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
        } else if (this.state.posterUri.length === 0 && this.state.name) {
            e.preventDefault();
            message.error("You're not choosing any movies", 1);
        } else if (this.state.posterUri.length < 3 && this.state.name) {
            e.preventDefault();
            message.error("Post at least 3 movies", 1);
        }
    }

    // for react select

    setFocusInput = () => {
        this.refs.stateSelect.focus();
        // this.setState({ inputValue: '' })
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


    render() {
        const Option = (props) => {
            const option = { ...props.data };
            return (
                <div className="searchMovie" ref={props.innerRef} {...props.innerProps}>
                    <img alt={option.title} src={option.posterUri !== 'https://image.tmdb.org/t/p/w500null' ? option.posterUri : 'https://vnkings.com/wp-content/uploads/2018/01/unknown_01.jpg'} style={{ width: '100px', height: 'auto' }} />
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
                this.state.posterUri[index]
                    ? (
                        <div key={index} className="col-4 col-md-2 sd-phone hoverMovie" >
                            <div className="postModal " style={{
                                backgroundImage: `url('${this.state.posterUri[index]}')`,
                            }}>
                            </div>
                            <i className="fas fa-times deleteMovie" onClick={this.clear.bind(this, index)}></i>
                        </div>
                    )
                    :
                    (
                        <div className="col-4 col-md-2 sd-phone" onClick={this.setFocusInput} key={index}>
                            <div className="postModal">
                                <i className="fas fa-plus" style={{
                                    position: 'absolute',
                                    transform: 'translate(-50% , -50%)',
                                    top: '50%',
                                    fontSize: '30px',
                                    color: '#bababa',
                                    left: '50%'
                                }}></i>
                            </div>
                        </div>
                    )
            )
        })
        return (
            <form className="form-group">
                <div className="row" style={{ padding: '10px' }}>
                    <div className="col-md-6 col-12 marginBottom">
                        <input placeholder="Title" className="form-control" required onChange={e => this.handleChangeText(e.target.value)} />
                    </div>
                    <div className="col-md-6 col-12 marginBottom" style={this.state.id.length === 6 ? { display: 'none' } : {}} >
                        <Async
                            ref="stateSelect"
                            loadOptions={this.getMovie} //input tra ve json
                            components={{ Option }} // customize menu
                            onChange={this.onChange}
                            value={this.state.inputValue}
                            blurInputOnSelect={true}
                            placeholder='Enter movie title , credits ..'
                            getOptionLabel={({ title }) => title}
                            defaultOptions
                            cacheOptions
                            required
                        />
                    </div>
                    <div className="col-12" style={{ marginTop: '20px' }} >
                        <div className="row">
                            {post_arr}
                        </div>
                    </div>
                </div>
                <center>
                    <button className="btn primaryButton" onClick={this.submitList}>
                        Submit
                            </button>
                </center>
            </form>
        );
    }
}

export default PostListModal;
