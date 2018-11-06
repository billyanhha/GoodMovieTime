import React, { Component } from 'react'
import Header from '../components/Header.jsx';
import MyNavbar from '../components/MyNavbar.jsx';

export default class AboutUs extends Component {

    render() {
        return (
            <div className="container-fluid animation">
                <Header username={this.props.username} id={this.props.id} />
                <MyNavbar username={this.props.username} id={this.props.id} />
                <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
                <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
                <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
                <section id="team" class="pb-5">
                    <div class="container">
                        <h5 class="section-title h1">OUR TEAM</h5>
                        <div class="row">
                            <div class="col-md-4 col-md-offset-2">
                                <div class="image-flip" ontouchstart="this.classList.toggle('hover');">
                                    <div class="mainflip">
                                        <div class="frontside">
                                            <div class="card">
                                                <div class="card-body text-center">
                                                    <p><img class=" img-fluid" src="https://scontent.fhan2-2.fna.fbcdn.net/v/t1.0-9/26231639_546594332368679_4121278813743697080_n.jpg?_nc_cat=111&_nc_ht=scontent.fhan2-2.fna&oh=97e8ca261c20484d7c8f739e3afb77b2&oe=5C7D1CC1" alt="card image" /></p>
                                                    <h4 class="card-title">Hà Quý Anh</h4>
                                                    <p class="card-text">Leader</p>
                                                    <a href="#" class="btn btn-primary btn-sm"><i class="fa fa-plus"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="backside">
                                            <div class="card">
                                                <div class="card-body text-center mt-4">
                                                    <h4 class="card-title">Nhiệm Vụ Trong Team</h4>
                                                    <p class="card-text">Quý Anh là người đã lên ý tưởng và code chính hầu như các chức năng của website.</p>
                                                    <ul class="list-inline">
                                                        <li class="list-inline-item">
                                                            <a class="social-icon text-xs-center" target="_blank" href="https://www.facebook.com/vova.arebeast">
                                                                <i class="fa fa-facebook"></i>
                                                            </a>
                                                        </li>
                                                        <li class="list-inline-item">
                                                            <a class="social-icon text-xs-center" target="_blank" href="#">
                                                                <i class="fa fa-twitter"></i>
                                                            </a>
                                                        </li>
                                                        <li class="list-inline-item">
                                                            <a class="social-icon text-xs-center" target="_blank" href="#">
                                                                <i class="fa fa-skype"></i>
                                                            </a>
                                                        </li>
                                                        <li class="list-inline-item">
                                                            <a class="social-icon text-xs-center" target="_blank" href="#">
                                                                <i class="fa fa-google"></i>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-4 col-md-offset-2">
                                <div class="image-flip" ontouchstart="this.classList.toggle('hover');">
                                    <div class="mainflip">
                                        <div class="frontside">
                                            <div class="card">
                                                <div class="card-body text-center">
                                                    <p><img class=" img-fluid" src="https://scontent.fhan2-4.fna.fbcdn.net/v/t1.0-9/44991963_704104443300716_8479423601710202880_n.jpg?_nc_cat=105&_nc_ht=scontent.fhan2-4.fna&oh=05718f10831554261a9e07e12c2cc7ba&oe=5C80F8A4" alt="card image" /></p>
                                                    <h4 class="card-title">Đinh Hoàng Quang Anh</h4>
                                                    <p class="card-text">Member</p>
                                                    <a href="#" class="btn btn-primary btn-sm"><i class="fa fa-plus"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="backside">
                                            <div class="card">
                                                <div class="card-body text-center mt-4">
                                                    <h4 class="card-title">Nhiệm Vụ Trong Team</h4>
                                                    <p class="card-text">Code phụ 1 số giao diện và tìm kiếm content.</p>
                                                    <ul class="list-inline">
                                                        <li class="list-inline-item">
                                                            <a class="social-icon text-xs-center" target="_blank" href="https://www.facebook.com/anhdhqse05546">
                                                                <i class="fa fa-facebook"></i>
                                                            </a>
                                                        </li>
                                                        <li class="list-inline-item">
                                                            <a class="social-icon text-xs-center" target="_blank" href="#">
                                                                <i class="fa fa-twitter"></i>
                                                            </a>
                                                        </li>
                                                        <li class="list-inline-item">
                                                            <a class="social-icon text-xs-center" target="_blank" href="#">
                                                                <i class="fa fa-skype"></i>
                                                            </a>
                                                        </li>
                                                        <li class="list-inline-item">
                                                            <a class="social-icon text-xs-center" target="_blank" href="#">
                                                                <i class="fa fa-google"></i>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="col-xs-12 col-sm-6 col-md-4">
                                <div class="image-flip" ontouchstart="this.classList.toggle('hover');">
                                    <div class="mainflip">
                                        <div class="frontside">
                                            <div class="card">
                                                <div class="card-body text-center">
                                                    <p><img class=" img-fluid" src="https://scontent.fhan2-2.fna.fbcdn.net/v/t1.0-1/31138901_1631744556944304_3075994455715610624_n.jpg?_nc_cat=106&_nc_ht=scontent.fhan2-2.fna&oh=c8a579f4ec61840b167462aedeeaff4c&oe=5C7C5BAE" alt="card image" /></p>
                                                    <h4 class="card-title">Đặng Xuân Tùng</h4>
                                                    <p class="card-text">Member</p>
                                                    <a href="#" class="btn btn-primary btn-sm"><i class="fa fa-plus"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="backside">
                                            <div class="card">
                                                <div class="card-body text-center mt-4">
                                                    <h4 class="card-title">Nhiệm Vụ Trong Team</h4>
                                                    <p class="card-text">Code phụ 1 số giao diện và tìm kiếm content.</p>
                                                    <ul class="list-inline">
                                                        <li class="list-inline-item">
                                                            <a class="social-icon text-xs-center" target="_blank" href="https://www.facebook.com/dxthl98">
                                                                <i class="fa fa-facebook"></i>
                                                            </a>
                                                        </li>
                                                        <li class="list-inline-item">
                                                            <a class="social-icon text-xs-center" target="_blank" href="#">
                                                                <i class="fa fa-twitter"></i>
                                                            </a>
                                                        </li>
                                                        <li class="list-inline-item">
                                                            <a class="social-icon text-xs-center" target="_blank" href="#">
                                                                <i class="fa fa-skype"></i>
                                                            </a>
                                                        </li>
                                                        <li class="list-inline-item">
                                                            <a class="social-icon text-xs-center" target="_blank" href="#">
                                                                <i class="fa fa-google"></i>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-xs-12 col-sm-6 col-md-4 col-md-offset-2">
                                <div class="image-flip" ontouchstart="this.classList.toggle('hover');">
                                    <div class="mainflip">
                                        <div class="frontside">
                                            <div class="card">
                                                <div class="card-body text-center">
                                                    <p><img class=" img-fluid" src="https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-9/18698294_294550764321417_7300392582146315950_n.jpg?_nc_cat=103&_nc_ht=scontent.fhan2-1.fna&oh=6eb52e7578f495d188a9a795c34f076a&oe=5C41F22C" alt="card image" /></p>
                                                    <h4 class="card-title">Lý Đinh Nhơn Nghĩa</h4>
                                                    <p class="card-text">Member</p>
                                                    <a href="#" class="btn btn-primary btn-sm"><i class="fa fa-plus"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="backside">
                                            <div class="card">
                                                <div class="card-body text-center mt-4">
                                                    <h4 class="card-title">Nhiệm Vụ Trong Team</h4>
                                                    <p class="card-text">Điều giao diện và hoàn thành tất cả các content.</p>
                                                    <ul class="list-inline">
                                                        <li class="list-inline-item">
                                                            <a class="social-icon text-xs-center" target="_blank" href="https://www.facebook.com/lydinhnhonnghia">
                                                                <i class="fa fa-facebook"></i>
                                                            </a>
                                                        </li>
                                                        <li class="list-inline-item">
                                                            <a class="social-icon text-xs-center" target="_blank" href="#">
                                                                <i class="fa fa-twitter"></i>
                                                            </a>
                                                        </li>
                                                        <li class="list-inline-item">
                                                            <a class="social-icon text-xs-center" target="_blank" href="#">
                                                                <i class="fa fa-skype"></i>
                                                            </a>
                                                        </li>
                                                        <li class="list-inline-item">
                                                            <a class="social-icon text-xs-center" target="_blank" href="#">
                                                                <i class="fa fa-google"></i>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-xs-12 col-sm-6 col-md-4">
                                <div class="image-flip" ontouchstart="this.classList.toggle('hover');">
                                    <div class="mainflip">
                                        <div class="frontside">
                                            <div class="card">
                                                <div class="card-body text-center">
                                                    <p><img class=" img-fluid" src="https://scontent.fhan2-1.fna.fbcdn.net/v/t1.0-9/11377121_475737792584217_6791889811253160030_n.jpg?_nc_cat=103&_nc_ht=scontent.fhan2-1.fna&oh=3328c2e0d1d65aa0ac78659a876cc89d&oe=5C6FA6FC" alt="card image" /></p>
                                                    <h4 class="card-title">Nam Sơn</h4>
                                                    <p class="card-text">Member</p>
                                                    <a href="#" class="btn btn-primary btn-sm"><i class="fa fa-plus"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="backside">
                                            <div class="card">
                                                <div class="card-body text-center mt-4">
                                                    <h4 class="card-title">Nhiệm Vụ Trong Team</h4>
                                                    <p class="card-text">Điều chỉnh giao diện và hoàn thành content cho website.</p>
                                                    <ul class="list-inline">
                                                        <li class="list-inline-item">
                                                            <a class="social-icon text-xs-center" target="_blank" href="https://www.facebook.com/nam.son.39589">
                                                                <i class="fa fa-facebook"></i>
                                                            </a>
                                                        </li>
                                                        <li class="list-inline-item">
                                                            <a class="social-icon text-xs-center" target="_blank" href="#">
                                                                <i class="fa fa-twitter"></i>
                                                            </a>
                                                        </li>
                                                        <li class="list-inline-item">
                                                            <a class="social-icon text-xs-center" target="_blank" href="#">
                                                                <i class="fa fa-skype"></i>
                                                            </a>
                                                        </li>
                                                        <li class="list-inline-item">
                                                            <a class="social-icon text-xs-center" target="_blank" href="#">
                                                                <i class="fa fa-google"></i>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
