import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import '../UserGuideBlogCommon.css';
import { Box, Grid, Link } from '@material-ui/core';
import ArrowDown from '../../../assets/img/arrow-down.svg';

const useStyles = makeStyles({
});

const scrollToRef = (ref) => ref.current.scrollIntoView({ behavior: 'smooth' })

const CostToMineBlog = (props) => {
    const classes = useStyles();

    const myRef = useRef(null)
    const executeScroll = () => scrollToRef(myRef)

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Grid container spacing={3}>
                <Grid container spacing={1}>
                    <div className="braiins_section hero">
                        <Grid item xs={12} lg={6} >
                            <div className="card_content-wrapper intro">
                                <a className="blog_psot-category-name w-inline-block" href="https://braiins.com/category/bitcoin-mining-insights"> <div>Bitcoin Mining Insights</div></a>
                                <h1 className="h1-2">Cost to Mine 1 Bitcoin Calculator [User Guide]</h1>
                                <p className="blog_summary">A quick guide explaining how to use the Advanced Options in our new Cost to Mine 1 BTC calculator and where to find data on all the popular hardware models.</p>
                            </div>
                        </Grid>
                        <Grid item xs={12} lg={6} className="content-space-around-end">
                            <div class="blog_published-date">Published on Nov 03, 2020</div>
                            <div>
                                <Link
                                    component="a"
                                    underline="none"
                                    color="#ffffff"
                                    onClick={executeScroll}>
                                    <Box class="blog_start-reading-wrapper">
                                        <div>START READING</div>
                                        <img src={ArrowDown} alt="Not loaded" class="start-arrow"/>
                                    </Box>
                                </Link>
                            </div>
                        </Grid>
                    </div>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <div style={{ backgroundImage: "url('https://assets.website-files.com/5e5fcd39a7ed2643c8f70a6a/5fa11ec1e49048ab5eecbf25_ctm_featured.png')" }} className="braiins_section featured-img" ></div>
                    </Grid>
                </Grid>
                <Grid container spacing={1} id="start" ref={myRef}>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <div id="start" class="braiins_section part-1">
                                <div className="card_content-wrapper">
                                    <div className="toc-wrapper">
                                        <h4 className="black">Table of Contents</h4>
                                        <div className="toc">
                                            <ul>
                                                <li className="toc-h2 toc-active"><a href="#toc-how-to-calculate-your-cost-of-production">How to Calculate Your Cost of Production</a></li>
                                                <li className="toc-h2"><a href="#toc-cost-to-mine-1-btc-example">Cost to Mine 1 BTC&nbsp;Example</a></li>
                                                <li className="toc-h2"><a href="#toc-sharing-and-embedding">Sharing and Embedding</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="blog_content w-richtext" >
                                        <p>Although there are dozens of variables that can impact a Bitcoin mining operation’s bottom line, the viability of a mining business can ultimately be determined with just one simple statistic: the cost to mine 1 BTC — aka the “Cost of Production for Bitcoin.”</p><p>The Braiins <a href="https://insights.braiins.com/cost-to-mine" target="_blank">Cost to Mine 1 BTC calculator</a> is meant to make it quick and easy for you to determine your cost of production for any ASIC hardware model or even for a mix of different hardware devices. By comparing your cost of production with the actual Bitcoin price, you can see your profit margin and better understand which hardware models will best suit your mining operation.</p>
                                        <span id="toc-how-to-calculate-your-cost-of-production"></span>
                                        <h2>How to Calculate Your Cost of Production</h2>
                                        <p>Let’s start by quickly explaining each of the inputs and how they work.</p>
                                        <ul>
                                            <li><strong><em>Bitcoin Price</em></strong><em> </em>and <strong><em>Network Difficulty </em></strong>are both pulled from an API in real-time, so you don’t need to do anything if you want to use current values.</li>
                                            <li><strong><em>Select Hardware</em></strong><em> </em>allows you to autofill the hashrate and consumption by choosing a specific ASIC device from our database. The models are sorted by hardware manufacturer (Bitmain, MicroBT, Innosilicon, and Canaan) and then further subcategorized by model family (e.g. Antminer S9, S17, and S19 variations are all grouped together).</li>
                                        </ul>
                                        <figure className="w-richtext-align-center w-richtext-figure-type-image">
                                            <div>
                                                <img src="https://assets.website-files.com/5e5fcd39a7ed2643c8f70a6a/5fa11fe937fb6a83b0045c9f_hwselection.png" loading="lazy" alt="" />
                                            </div>
                                        </figure>
                                        <p>Alternatively, you can select the <em>Custom </em>option to input your own hashrate and power consumption values rather than using preloaded values from the ASIC database, which is best if you use a performance boosting firmware like <a href="https://braiins.com/os/plus" target="_blank">Braiins OS+</a> to improve your device’s efficiency.&nbsp;</p>
                                        <ul >
                                            <li><strong><em>Electricity Price</em></strong> is your all-in cost per kWh of electricity, which is used to calculate your cost of production for mining 1 Bitcoin given your mining efficiency (W/TH).&nbsp;</li>
                                            <li><strong><em>Pool Fee</em></strong> is the percentage of your BTC mined that is kept by your mining pool.</li>
                                        </ul>
                                        <p>If you toggle on the Advanced Options, you’ll also see these inputs:</p>
                                        <ul >
                                            <li><strong><em>Other Fees</em></strong> factors in additional costs such as downtime of your ASICs (e.g. 1-2% for regular maintenance or perhaps much higher if you cycle on/off due to climate), or perhaps fees for firmware and management solutions.</li>
                                            <li><strong><em>Difficulty Change</em></strong><em> </em>allows you to change the current value for difficulty by any percentage you want, in case you would like to project your cost to mine in a future difficulty epoch.</li>
                                            <li><strong><em>Avg. Transaction Fees (BTC)</em></strong> is used to factor in extra revenue from transaction fees instead of only including the fixed block subsidy of 6.25 BTC. Although this is highly variable depending on network activity, it has averaged out to about 0.3 BTC per block (or 5% of total mining revenue) since the 2020 halving. As a result, true Cost to Mine 1 BTC is lower than if you only factor in the block subsidy.</li>
                                        </ul>
                                        <figure className="w-richtext-align-center w-richtext-figure-type-image">
                                            <div>
                                                <img src="https://assets.website-files.com/5e5fcd39a7ed2643c8f70a6a/5f9c1a6b44dae92ff917273c_XbKHkmB1GhuqVaP93W4mo7yqyGYbyv-U3VuL3LnpjPgR8DHXSl57OU-uZ0uWO_1A3NGcT_UiFRE1LDeBo6J2gxe2n4sVBmRkvJp67RSEF-e-ZhPQMGcplb2Cc_XYRR3nbA1NkB0.png" alt="" />
                                            </div>
                                            <figcaption>
                                                Average % of the total block reward made up by transaction fees over time.
                    </figcaption>
                                        </figure>
                                        <span id="toc-cost-to-mine-1-btc-example"></span>
                                        <h2>Cost to Mine 1 BTC&nbsp;Example</h2>
                                        <p>To give you an example of how this tool can be used, we’ll compare a stock Antminer S9 with a custom S9 running Braiins OS+ autotuning firmware.</p>
                                        <figure className="w-richtext-align-center w-richtext-figure-type-image">
                                            <div>
                                                <img src="https://assets.website-files.com/5e5fcd39a7ed2643c8f70a6a/5fa11c3e0db131097e1b9f88_s9_vs_bosplus-1.png" loading="lazy" alt="" />
                                            </div>
                                            <figcaption>
                                                Antminer S9 with stock firmware compared to an S9 with Braiins OS+
                    </figcaption>
                                        </figure>
                                        <p>You can see that improving the efficiency of the S9 by running Braiins OS+ firmware brings the cost to mine 1 BTC down from $9293 to $7787 and the break-even electricity price from $0.043 to $0.052 per kWh. The S9 on stock firmware has a 2% pool fee, while the S9 on Braiins OS+&nbsp;has a 2% devfee but 0% pool fees on Slush Pool. In other words, the same machine with essentially the same external conditions was made significantly more economical by upgrading the firmware.</p>
                                        <span id="toc-sharing-and-embedding"></span>
                                        <h2>Sharing and Embedding</h2>
                                        <p>If you think this tool can be useful to others in the mining industry, please share it! The <em>Share </em>button right above the chart allows you to share a URL with all of your user inputs, or you can select the embed option and embed an iframe of the tool in English, Russian, Spanish, Farsi, or Chinese.</p><p>This is also just the first of many tools and stats for Bitcoin miners that we will be releasing in <a href="https://insights.braiins.com/" target="_blank">Braiins Mining Insights</a> over the following months, so check back soon to see what else we’re publishing!</p>
                                    </div>
                                </div>
                            </div>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CostToMineBlog);