import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

import Logo from '../../../assets/img/logo.png';

import TelegramSvgIcon from '../../../assets/img/telegram.svg';
import TwitterSvgIcon from '../../../assets/img/twitter.svg';
import YoutubeSvgIcon from '../../../assets/img/youtube.svg';
import GithubSvgIcon from '../../../assets/img/github.svg';
import WechatSvgIcon from '../../../assets/img/wechat.svg';

import './footer.css';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#161616',
    height: 248,
  },
}));

const Footer = (props) => {
  const classes = useStyles(props);

  return (
    <div className="bos_footer">
      <div className="content-wrapper footer">
        <div className="w-layout-grid footer-grid">
          <div className="footer-wrapper-content">
            <div className="footer-heading">About</div>
            <a href="https://braiins.com/story" className="footer-link">Story</a>
            <a href="https://braiins.com/products" className="footer-link">Product &amp; services</a>
            <a href="https://braiins.com/careers" className="footer-link">Careers</a>
          </div>
          <div className="footer-wrapper-content">
            <div className="footer-heading">Newsroom</div>
            <a href="https://braiins.com/news" target="_blank" className="footer-link">Blog</a>
            <a href="https://braiins.com/product-updates" target="_blank" className="footer-link">Product updates</a>
          </div>
          <div className="footer-wrapper-content">
            <div className="footer-heading">Legal</div>
            <a href="https://braiins.com/privacy-policy" target="_blank" className="footer-link en">Privacy Policy</a>
            <a href="https://braiins.com/contact" target="_blank" className="footer-link">Contact</a>
          </div>
          <div id="w-node-56bbd2b18f59-a6483ec5" className="footer-wrapper-content">
            <a href="https://https://braiins.com/?utm_source=BOS&amp;utm_medium=footer" target="_blank" className="w-inline-block">
              <img src={Logo} width="95" alt="" className="image-93"/>
            </a>
            /*<div className="braiins-about">
              <span className="text-span-5">Bitcoin mining full stack company.<br/></span>
              Pushing the industry forward with a full-stack mining solution from mining firmware up to the pool.<br/>
            </div>
            <div className="footer-upt_1 _2 desktop">
              <a href="https://t.me/BraiinsOS" target="_blank" className="header_social-link en w-inline-block">
                <img src={TelegramSvgIcon} alt=""/>
              </a>
              <a href="https://twitter.com/slush_pool" target="_blank" className="header_social-link w-inline-block">
                <img src={TwitterSvgIcon} alt=""/>
              </a>
              <a href="https://www.youtube.com/channel/UClUiH7v_yj0SNpda99s9_tQ/featured" target="_blank" className="header_social-link w-inline-block">
                <img src={YoutubeSvgIcon} alt=""/>
              </a>
              <a href="https://github.com/braiins/braiins" target="_blank" className="header_social-link en w-inline-block">
                <img src={GithubSvgIcon} alt=""/>
              </a>
              <a href="#" className="header_social-link wechat w-inline-block">
                <img src={WechatSvgIcon} alt=""/>
                <div className="wechat-qr-kod">
                  <img src="images/wechat-official-account-QR-code.jpg" alt=""/>
                </div>
              </a>*/
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
