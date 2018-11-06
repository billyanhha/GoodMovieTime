import React, { Component } from 'react';
import Header from '../components/Header.jsx';
import MyNavbar from '../components/MyNavbar.jsx';
import { Icon } from "antd";
import { translate } from "react-i18next";
import axios from "../axios";
import Loader from '../components/Loader';
import SearchResult from '../components/SearchResult';
import i18n from '../locales/i18n';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSearch: 'USER',
            loading: false,
        }
    }

    handleChange = async (e) => {
        await this.setState({ content: e.target.value });
    }

    searchUser = () => {
        if (this.state.content) {
            this.setState({ loading: true });
            axios.get(`/api/users/search?content=${this.state.content}`)
                .then(data => {
                    this.setState({ data: data.data, loading: false });
                })
                .catch(err => {
                    console.log(err);
                    this.setState({ loading: false , data:[] });
                })
        }
    }

    searchList = () => {
        if (this.state.content) {
            this.setState({ loading: true });
            axios.get(`/api/lists/search?content=${this.state.content}`)
                .then(data => {
                    this.setState({ data: data.data, loading: false });
                })
                .catch(err => {
                    console.log(err);
                    this.setState({ loading: false , data:[] });
                })
        }
    }

    searchMovies = () => {
        if (this.state.content) {
            console.log(i18n.language)
            this.setState({ loading: true });
            axios.get(`/api/movies?content=${this.state.content}&language=${i18n.language}`)
                .then(data => {
                    this.setState({ data: data.data, loading: false });
                })
                .catch(err => {
                    console.log(err);
                    this.setState({ loading: false , data:[] });
                })
        }
    }


    searchByType = async (type) => {
        if (type === "USER") {
            await this.setState({ currentSearch: 'USER' })
            this.searchUser();
        }
        if (type === 'LIST') {
            await this.setState({ currentSearch: 'LIST' })
            this.searchList();
        }
        if (type === 'MOVIE') {
            await this.setState({ currentSearch: 'MOVIE' })
            this.searchMovies();
        }
    }

    searchData = (e) => {
        e.preventDefault();
        let type = this.state.currentSearch;
        if (this.state.content) {
            if (type === "USER") {
                this.searchUser();
            }
            if (type === 'LIST') {
                this.searchList();
            }
            if (type === 'MOVIE') {
                this.searchMovies();
            }
        }
    }


    render() {
        const { t } = this.props;

        const arr = ['USER', 'LIST', 'MOVIE'];
        const renderSearchType = arr.map((value, index) => {
            return (
                <button key={index} onClick={this.searchByType.bind(this, value)} disabled={this.state.loading} className={this.state.currentSearch === value ? "search-type-button-active" : "search-type-button"} >{value}</button>
            )
        })

        return (
            <div className="container-fluid">
                <Header username={this.props.username} id={this.props.id} />
                <MyNavbar username={this.props.username} id={this.props.id} />
                <div className="search" >
                    <div className="search-form" >
                        <Icon style={{ fontSize: '25px', fontWeight: 'bold', }} type="search" theme="outlined" />
                        <form className="search-form-input" onSubmit={this.searchData} >
                            <input onChange={this.handleChange} className="search-form-input" placeholder="SEARCH" />
                        </form>
                    </div>
                    <div className="search-type" >
                        {renderSearchType}
                    </div>
                    {
                        this.state.loading
                            ?
                            (<Loader />)
                            : (
                                <SearchResult type={this.state.currentSearch} data={this.state.data} />
                            )
                    }
                </div>
            </div>
        )
    }
}

export default translate()(Search);
