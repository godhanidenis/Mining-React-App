import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useLocation } from 'react-router-dom';

import LogoGray from '../../../assets/img/logo-gray.png';
import LogoWhite from '../../../assets/img/logo.png';

import TelegramSvgIcon from '../../../assets/img/telegram.svg';
import TwitterSvgIcon from '../../../assets/img/twitter.svg';
import YoutubeSvgIcon from '../../../assets/img/youtube.svg';
import GithubSvgIcon from '../../../assets/img/github.svg';
import WechatSvgIcon from '../../../assets/img/wechat.svg';

import { isEmbed } from '../../../constants';


import './footer.css';

const useStyles = makeStyles(theme => ({
  root: {
    alignItems: 'center',
    backgroundColor: '#161616',
    borderTop: '1px solid #525252',
    padding: '2rem',
  },
  description: {
    color: '#6F6F6F',
    paddingTop: 2,
  },
  socialIcon: {
    fill: '#8d8d8d',
    height: '1rem',
    margin: '0 5px',
    verticalAlign: 'middle',
    width: '1rem',
  },
  description_text: {
    color: '#8b7cff'
  }
}));

const Footer = (props) => {
  const classes = useStyles(props);
  const matches = useMediaQuery('(max-width:767px)');
  const location = useLocation();

  return (
    isEmbed(location.pathname) ? (
      <div className={classes.root}>
        <div className={matches? 'justify-content-between': 'd-flex justify-content-between'}>
          <div className="d-flex align-items-center">
            <div className={classes.description}>Mining Insights are created by <span className={classes.description_text}>Braiins</span></div>
          </div>
          <div id="w-node-56bbd2b18f59-a6483ec5" className="footer-wrapper-content">     
            <div className="footer-upt_1 _2 desktop">
              <div className="d-flex align-items-center">
              <a href="https://braiins.com" target="_blank" className="w-inline-block mr-5">
                <img src={LogoWhite} width="95" alt="" className="image-93"/>
              </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className={classes.root}>
        <div className={matches? 'justify-content-between': 'd-flex justify-content-between'}>
          <div className="d-flex align-items-center">
            <a href="https://braiins.com" target="_blank" className="w-inline-block mr-5">
              <img src={LogoGray} width="95" alt="" className="image-93"/>
            </a>
            <div className={classes.description}>Bitcoin Mining Fullstack Company</div>
          </div>
          <div id="w-node-56bbd2b18f59-a6483ec5" className="footer-wrapper-content">     
            <div className="footer-upt_1 _2 desktop">
              <div className="d-flex align-items-center">
                <a title="Twitter" href="https://twitter.com/slush_pool" class="footer_socialIcon" target="_blank" rel="noopener noreferrer" tabindex="0" role="button">
                  <svg className={classes.socialIcon} viewBox="0 0 14 12" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                    <path d="M12.5508 2.90625C13.0977 2.49609 13.5898 2.00391 13.9727 1.42969C13.4805 1.64844 12.9062 1.8125 12.332 1.86719C12.9336 1.51172 13.3711 0.964844 13.5898 0.28125C13.043 0.609375 12.4141 0.855469 11.7852 0.992188C11.2383 0.417969 10.5 0.0898438 9.67969 0.0898438C8.09375 0.0898438 6.80859 1.375 6.80859 2.96094C6.80859 3.17969 6.83594 3.39844 6.89062 3.61719C4.51172 3.48047 2.37891 2.33203 0.957031 0.609375C0.710938 1.01953 0.574219 1.51172 0.574219 2.05859C0.574219 3.04297 1.06641 3.91797 1.85938 4.4375C1.39453 4.41016 0.929688 4.30078 0.546875 4.08203V4.10938C0.546875 5.50391 1.53125 6.65234 2.84375 6.92578C2.625 6.98047 2.35156 7.03516 2.10547 7.03516C1.91406 7.03516 1.75 7.00781 1.55859 6.98047C1.91406 8.12891 2.98047 8.94922 4.23828 8.97656C3.25391 9.74219 2.02344 10.207 0.683594 10.207C0.4375 10.207 0.21875 10.1797 0 10.1523C1.25781 10.9727 2.76172 11.4375 4.40234 11.4375C9.67969 11.4375 12.5508 7.08984 12.5508 3.28906C12.5508 3.15234 12.5508 3.04297 12.5508 2.90625Z">
                    </path>
                  </svg>
                </a>
                <a title="Facebook" href="https://www.facebook.com/SlushPoolMining/" class="footer_socialIcon" target="_blank" rel="noopener noreferrer" tabindex="0" role="button">
                  <svg className={classes.socialIcon} viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                    <path d="M13.7812 7.75C13.7812 4.00391 10.7461 0.96875 7 0.96875C3.25391 0.96875 0.21875 4.00391 0.21875 7.75C0.21875 11.1406 2.67969 13.957 5.93359 14.4492V9.71875H4.21094V7.75H5.93359V6.27344C5.93359 4.57812 6.94531 3.62109 8.47656 3.62109C9.24219 3.62109 10.0078 3.75781 10.0078 3.75781V5.42578H9.16016C8.3125 5.42578 8.03906 5.94531 8.03906 6.49219V7.75H9.92578L9.625 9.71875H8.03906V14.4492C11.293 13.957 13.7812 11.1406 13.7812 7.75Z">
                    </path>
                  </svg>
                </a>
                <a title="Likedin" href="https://www.linkedin.com/company/braiins/" class="footer_socialIcon" target="_blank" rel="noopener noreferrer" tabindex="0" role="button">
                  <svg className={classes.socialIcon} viewBox="0 0 13 13" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                    <path d="M11.375 0.625H0.847656C0.382812 0.625 0 1.03516 0 1.52734V12C0 12.4922 0.382812 12.875 0.847656 12.875H11.375C11.8398 12.875 12.25 12.4922 12.25 12V1.52734C12.25 1.03516 11.8398 0.625 11.375 0.625ZM3.69141 11.125H1.88672V5.30078H3.69141V11.125ZM2.78906 4.48047C2.1875 4.48047 1.72266 4.01562 1.72266 3.44141C1.72266 2.86719 2.1875 2.375 2.78906 2.375C3.36328 2.375 3.82812 2.86719 3.82812 3.44141C3.82812 4.01562 3.36328 4.48047 2.78906 4.48047ZM10.5 11.125H8.66797V8.28125C8.66797 7.625 8.66797 6.75 7.73828 6.75C6.78125 6.75 6.64453 7.48828 6.64453 8.25391V11.125H4.83984V5.30078H6.5625V6.09375H6.58984C6.83594 5.62891 7.4375 5.13672 8.3125 5.13672C10.1445 5.13672 10.5 6.36719 10.5 7.92578V11.125Z">
                    </path>
                  </svg>
                </a>
                <a title="Youtube" href="https://www.youtube.com/channel/UClUiH7v_yj0SNpda99s9_tQ" class="footer_socialIcon" target="_blank" rel="noopener noreferrer" tabindex="0" role="button">
                  <svg className={classes.socialIcon} viewBox="0 0 16 11" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                    <path d="M15.0117 2.16797C14.8477 1.51172 14.3281 0.992188 13.6992 0.828125C12.5234 0.5 7.875 0.5 7.875 0.5C7.875 0.5 3.19922 0.5 2.02344 0.828125C1.39453 0.992188 0.875 1.51172 0.710938 2.16797C0.382812 3.31641 0.382812 5.77734 0.382812 5.77734C0.382812 5.77734 0.382812 8.21094 0.710938 9.38672C0.875 10.043 1.39453 10.5352 2.02344 10.6992C3.19922 11 7.875 11 7.875 11C7.875 11 12.5234 11 13.6992 10.6992C14.3281 10.5352 14.8477 10.043 15.0117 9.38672C15.3398 8.21094 15.3398 5.77734 15.3398 5.77734C15.3398 5.77734 15.3398 3.31641 15.0117 2.16797ZM6.34375 7.99219V3.5625L10.2266 5.77734L6.34375 7.99219Z">
                    </path>
                  </svg>
                </a>
                <a title="Telegram" href="https://t.me/BraiinsAnnouncements" class="footer_socialIcon" target="_blank" rel="noopener noreferrer" tabindex="0" role="button">
                  <svg className={classes.socialIcon} viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg" width="14" height="15">
                    <path d="M6.78125 0.96875C3.03516 0.96875 0 4.00391 0 7.75C0 11.4961 3.03516 14.5312 6.78125 14.5312C10.5273 14.5312 13.5625 11.4961 13.5625 7.75C13.5625 4.00391 10.5273 0.96875 6.78125 0.96875ZM10.0898 5.61719L8.99609 10.8672C8.91406 11.25 8.69531 11.332 8.36719 11.168L6.67188 9.91016L5.85156 10.7031C5.76953 10.7852 5.6875 10.8672 5.52344 10.8672L5.63281 9.14453L8.77734 6.30078C8.91406 6.19141 8.75 6.10938 8.55859 6.21875L4.67578 8.67969L3.00781 8.16016C2.65234 8.05078 2.65234 7.77734 3.08984 7.61328L9.625 5.09766C9.92578 4.98828 10.1992 5.17969 10.0898 5.61719Z">
                    </path>
                  </svg>
                </a>
                <a title="Github" href="https://github.com/braiins" class="footer_socialIcon" target="_blank" rel="noopener noreferrer" tabindex="0" role="button">
                  <svg className={classes.socialIcon} viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                    <path d="M4.51172 11.6328C4.51172 11.5781 4.45703 11.5234 4.375 11.5234C4.29297 11.5234 4.23828 11.5781 4.23828 11.6328C4.23828 11.6875 4.29297 11.7422 4.375 11.7148C4.45703 11.7148 4.51172 11.6875 4.51172 11.6328ZM3.66406 11.4961C3.66406 11.5508 3.71875 11.6328 3.80078 11.6328C3.85547 11.6602 3.9375 11.6328 3.96484 11.5781C3.96484 11.5234 3.9375 11.4688 3.85547 11.4414C3.77344 11.4141 3.69141 11.4414 3.66406 11.4961ZM4.89453 11.4688C4.8125 11.4688 4.75781 11.5234 4.75781 11.6055C4.75781 11.6602 4.83984 11.6875 4.92188 11.6602C5.00391 11.6328 5.05859 11.6055 5.03125 11.5508C5.03125 11.4961 4.94922 11.4414 4.89453 11.4688ZM6.67188 0.96875C2.89844 0.96875 0 3.86719 0 7.64062C0 10.6758 1.88672 13.2734 4.62109 14.2031C4.97656 14.2578 5.08594 14.0391 5.08594 13.875C5.08594 13.6836 5.08594 12.7539 5.08594 12.1797C5.08594 12.1797 3.17188 12.5898 2.76172 11.3594C2.76172 11.3594 2.46094 10.5664 2.02344 10.375C2.02344 10.375 1.39453 9.9375 2.05078 9.9375C2.05078 9.9375 2.73438 9.99219 3.11719 10.6484C3.71875 11.7148 4.70312 11.4141 5.11328 11.2227C5.16797 10.7852 5.33203 10.4844 5.55078 10.293C4.01953 10.1289 2.46094 9.91016 2.46094 7.28516C2.46094 6.51953 2.67969 6.16406 3.11719 5.67188C3.03516 5.48047 2.81641 4.76953 3.19922 3.8125C3.74609 3.64844 5.08594 4.55078 5.08594 4.55078C5.63281 4.38672 6.20703 4.33203 6.78125 4.33203C7.38281 4.33203 7.95703 4.38672 8.50391 4.55078C8.50391 4.55078 9.81641 3.62109 10.3906 3.8125C10.7734 4.76953 10.5273 5.48047 10.4727 5.67188C10.9102 6.16406 11.1836 6.51953 11.1836 7.28516C11.1836 9.91016 9.57031 10.1289 8.03906 10.293C8.28516 10.5117 8.50391 10.9219 8.50391 11.5781C8.50391 12.4805 8.47656 13.6289 8.47656 13.8477C8.47656 14.0391 8.61328 14.2578 8.96875 14.1758C11.7031 13.2734 13.5625 10.6758 13.5625 7.64062C13.5625 3.86719 10.4727 0.96875 6.67188 0.96875ZM2.65234 10.4023C2.59766 10.4297 2.625 10.5117 2.65234 10.5664C2.70703 10.5938 2.76172 10.6211 2.81641 10.5938C2.84375 10.5664 2.84375 10.4844 2.78906 10.4297C2.73438 10.4023 2.67969 10.375 2.65234 10.4023ZM2.35156 10.1836C2.32422 10.2383 2.35156 10.2656 2.40625 10.293C2.46094 10.3203 2.51562 10.3203 2.54297 10.2656C2.54297 10.2383 2.51562 10.2109 2.46094 10.1836C2.40625 10.1562 2.37891 10.1562 2.35156 10.1836ZM3.22656 11.168C3.19922 11.1953 3.19922 11.2773 3.28125 11.332C3.33594 11.3867 3.41797 11.4141 3.44531 11.3594C3.47266 11.332 3.47266 11.25 3.41797 11.1953C3.36328 11.1406 3.28125 11.1133 3.22656 11.168ZM2.92578 10.7578C2.87109 10.7852 2.87109 10.8672 2.92578 10.9219C2.98047 10.9766 3.03516 11.0039 3.08984 10.9766C3.11719 10.9492 3.11719 10.8672 3.08984 10.8125C3.03516 10.7578 2.98047 10.7305 2.92578 10.7578Z">
                    </path>
                  </svg>
                </a>
                <a title="wechat" onclick="wechat_open();" href="#" class="footer_socialIcon" target="_blank" rel="noopener noreferrer" tabindex="0" role="button">
                  <svg className={classes.socialIcon} viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                    <path d="M14.3347 12.4287C15.3507 11.6316 16 10.4535 16 9.14336C16 6.74389 13.842 4.79821 11.1807 4.79821C8.51933 4.79821 6.36133 6.74389 6.36133 9.14336C6.36133 11.5435 8.51933 13.4892 11.1807 13.4892C11.7307 13.4892 12.2613 13.4048 12.754 13.2512L12.8953 13.2281C12.988 13.2281 13.072 13.2591 13.1513 13.3082L14.2067 13.9675L14.2993 14C14.388 14 14.46 13.9221 14.46 13.8261L14.434 13.6992L14.2167 12.8226L14.2 12.7115C14.2 12.5947 14.2533 12.4915 14.3347 12.4287ZM5.78333 0C2.58933 0 0 2.33454 0 5.21519C0 6.78646 0.778667 8.20118 1.998 9.15707C2.096 9.23209 2.16 9.35618 2.16 9.49686L2.14 9.6296L1.87933 10.6814L1.848 10.8337C1.848 10.9491 1.93467 11.0429 2.04067 11.0429L2.15267 11.0039L3.41867 10.2125C3.51333 10.1534 3.614 10.1166 3.72533 10.1166L3.89533 10.144C4.486 10.3279 5.12333 10.4304 5.78333 10.4304L6.10067 10.4217C5.97533 10.0148 5.90667 9.58631 5.90667 9.14408C5.90667 6.51737 8.268 4.38772 11.1807 4.38772L11.4947 4.39637C11.0593 1.90529 8.668 0 5.78333 0ZM9.574 8.44863C9.21933 8.44863 8.932 8.13697 8.932 7.75317C8.932 7.36865 9.21933 7.05771 9.574 7.05771C9.92933 7.05771 10.2167 7.36865 10.2167 7.75317C10.2167 8.13697 9.92933 8.44863 9.574 8.44863ZM12.7873 8.44863C12.432 8.44863 12.1447 8.13697 12.1447 7.75317C12.1447 7.36865 12.432 7.05771 12.7873 7.05771C13.142 7.05771 13.4293 7.36865 13.4293 7.75317C13.4293 8.13697 13.142 8.44863 12.7873 8.44863ZM3.85533 4.3805C3.42933 4.3805 3.08467 4.0068 3.08467 3.54653C3.08467 3.08554 3.42933 2.71184 3.85533 2.71184C4.28133 2.71184 4.62667 3.08554 4.62667 3.54653C4.62667 4.0068 4.28133 4.3805 3.85533 4.3805ZM7.71067 4.3805C7.28467 4.3805 6.94 4.0068 6.94 3.54653C6.94 3.08554 7.28467 2.71184 7.71067 2.71184C8.13667 2.71184 8.482 3.08554 8.482 3.54653C8.482 4.0068 8.13667 4.3805 7.71067 4.3805Z">
                    </path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
