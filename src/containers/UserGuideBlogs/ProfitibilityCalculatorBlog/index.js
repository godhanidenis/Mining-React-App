import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import '../UserGuideBlogCommon.css';
import { Box, Grid, Link } from '@material-ui/core';
import ArrowDown from '../../../assets/img/arrow-down.svg';

const useStyles = makeStyles({
});

const scrollToRef = (ref) => ref.current.scrollIntoView({ behavior: 'smooth' })

const ProfitabilityCalculatorBlog = (props) => {
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
                                <h1 className="h1-2">Mining Profitability & Cash Flow Calculator [User Guide]</h1>
                                <p className="blog_summary">Instructions explaining how to use the Advanced Options in our new Bitcoin mining profitability calculator in order to estimate cash flow for your mining operation.</p>
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
                                        <img src={ArrowDown} alt="Not loaded" class="start-arrow" />
                                    </Box>
                                </Link>
                            </div>
                        </Grid>
                    </div>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <div style={{ backgroundImage: "url('https://assets.website-files.com/5e5fcd39a7ed2643c8f70a6a/6040d690d262994de9f384f4_Profit-Calc.png')" }} className="braiins_section featured-img" ></div>
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
                                                <li className="toc-h2 toc-active"><a href="#toc-bitcoin-mining-profitability-calculator-basic-options-">Bitcoin Mining Profitability Calculator (Basic Options)</a></li>
                                                <li className="toc-h2"><a href="#toc-bitcoin-mining-cash-flow-calculator-advanced-options-">Bitcoin Mining Cash Flow Calculator (Advanced Options)</a></li>
                                                <li className="toc-h3"><a href="#toc-capital-expenditure-capex-">Capital Expenditure (CAPEX)</a></li>
                                                <li className="toc-h3"><a href="#toc-monthly-operational-expenditure-opex-">Monthly Operational Expenditure (OPEX)</a></li>
                                                <li className="toc-h3"><a href="#toc-initial-hardware-value-initial-infrastructure-value">Initial Hardware Value &amp; Initial Infrastructure Value</a></li>
                                                <li className="toc-h3"><a href="#toc-hardware-infrastructure-appreciation-depreciation-">Hardware &amp; Infrastructure Appreciation / Depreciation (%)</a></li>
                                                <li className="toc-h3"><a href="#toc-hodl-ratio">HODL Ratio</a></li>
                                                <li className="toc-h3"><a href="#toc-discount-rate">Discount Rate</a></li>
                                                <li className="toc-h2"><a href="#toc-projecting-possible-scenarios">Projecting Possible Scenarios</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="blog_content w-richtext">
                                        <p>There are dozens of Bitcoin mining profitability calculators out there that miners can use to make quick estimates about their margins.
                                In fact, these mining tools have existed for almost as long as Bitcoin itself.</p>
                                        <p>However, we’ve created a new profitability calculator which aims to provide far more customization
                                        for the many variables that go into a mining operation’s cash flow analysis. Namely, we enable users to
                                        set advanced variables such as monthly Bitcoin price and difficulty increments, capital expenditure (CAPEX)
                                and ASIC hardware inventory values, asset appreciation or depreciation, additional fees and operating expenses, and more. </p>
                                        <p>In this guide, we’ll explain how to use these advanced options to
                                        make detailed projections of your potential cash flow from Bitcoin mining.
                                These cash flow visualizations can be particularly useful for pitch decks if you are raising funds or just for yourself to get a better idea of how to best reinvest past profits into newer hardware.  </p>
                                        <span id="toc-bitcoin-mining-profitability-calculator-basic-options-"></span>
                                        <h3>Bitcoin Mining Profitability Calculator (Basic Options)</h3>

                                        <figure class="w-richtext-align-center w-richtext-figure-type-image">
                                            <div>
                                                <img src="https://assets.website-files.com/5e5fcd39a7ed2643c8f70a6a/6040d7d6f3cf9cfb1b5e3652__OdTWWI_RjpVObHUWMYpfNmmRE7NaFXhQx9HutsW6fDo6zRfCMHKptxvwh3ngBdD5g7Waq2jZtqnZ0QtTAAFYZ-TrH69vRGeflVDEs0hHKANNyp4PeZsMmvs-wizwtIBHK5NZkM.png" alt="" />
                                            </div>
                                        </figure>

                                        <p>The basic version of our profitability calculator is what you’re likely already accustomed to seeing on other sites. The inputs are:</p>
                                        <ul>
                                            <li><strong>Current BTC price & difficulty </strong> (pulled from an API in real-time but still customizable)</li>
                                            <li><strong>Total hashrate </strong> (TH/s)</li>
                                            <li><strong>Total power consumption </strong> (Watts)</li>
                                            <li><strong>Electricity price </strong> ($/kWh)</li>
                                            <li><strong>Pool & other fees </strong> (e.g. firmware devfees, revenue splits, etc.; taken as a % of revenue)</li>
                                            <li><strong>Time period </strong> (custom range from 6 - 60 months)</li>
                                            <li><strong>Avg. transaction fees per block </strong> (additional mining revenue from transaction fees)</li>
                                            <li><strong>Price increment </strong> (change the BTC price by a custom % monthly)</li>
                                            <li><strong>Difficulty increment </strong> (change the BTC network difficulty by a custom % monthly)</li>
                                        </ul>
                                        <p>Bitcoin’s network difficulty has always increased significantly over long time periods, but the increase typically lags price increases because the time to manufacture and deploy new ASIC hardware is a bottleneck on difficulty growth. </p>
                                        <figure class="w-richtext-align-center w-richtext-figure-type-image">
                                            <div>
                                                <img src="https://assets.website-files.com/5e5fcd39a7ed2643c8f70a6a/6040d7d6f3cf9cfb1b5e3652__OdTWWI_RjpVObHUWMYpfNmmRE7NaFXhQx9HutsW6fDo6zRfCMHKptxvwh3ngBdD5g7Waq2jZtqnZ0QtTAAFYZ-TrH69vRGeflVDEs0hHKANNyp4PeZsMmvs-wizwtIBHK5NZkM.png" alt="" />
                                            </div>
                                        </figure>
                                        <p>Keep in mind that both of these increments are MONTHLY, meaning that the difficulty increment in the cash flow calculator accounts for a bit more than two actual Bitcoin difficulty adjustments each time. <em>For difficulty to approximately double over the course of 1 year — as it has historically done in the last few years — the monthly difficulty increment should be set at about 6%</em>.</p>
                                        <p>Price is relatively harder to predict, so we recommend playing around with different bullish and bearish scenarios. For example, see what would happen by increasing price faster than difficulty (as occurs in bull markets) or increasing it slower than difficulty (as occurs in sideways movements or bear markets).</p>
                                        <p>Once you put in your values for the inputs above, you’ll receive the following information about your operation:</p>
                                        <ul>
                                            <li>Monthly revenue in BTC and total BTC mined over the full time period</li>
                                            <li>Monthly profit or loss in USD (or other fiat currency)</li>
                                            <li>Cumulative profit or loss in USD over your selected time period</li>
                                            <li>Your break-even electricity price given your hashrate, consumption, and pool fee</li>
                                            <li>Your average cost of production for 1 BTC over your selected time period</li>
                                        </ul>
                                        <p>But to really make the most of this tool, we recommend using the advanced options.</p>
                                        <span id="toc-bitcoin-mining-cash-flow-calculator-advanced-options-"></span>
                                        <h2>Bitcoin Mining Cash Flow Calculator (Advanced Options)</h2>
                                        <figure class="w-richtext-align-center w-richtext-figure-type-image">
                                            <div>
                                                <img src="https://assets.website-files.com/5e5fcd39a7ed2643c8f70a6a/6040d7d5920f6c3fc0e77165_z0PxmAnQmx5nQiD1hXejwgnbIlGCdmEdju0Pz4ugzyYEq1bp5wVf3ARJ-WCeDznEkUu0GFC3HvRiut-lC6kSP5xz3jeVTKRv8ZegOS_HvwqzuCNAbylae18Etpd73CdDzFqya8c.png" target="_blank" />
                                            </div>
                                            <figcaption>
                                                Source: <a href="https://insights.braiins.com/profitability-calculator?btc_price=49075&network_difficulty=21724134900047&hashrate=6800&consumption=336000&electricity=0.03&block_reward=6.25&pool_fee=2&tx_fees=0&time_period=12&other_fees=0&diff_increment=4&capex=350000&starting_assets=0&asset_change=0&price_increment=6&initial_hardware=100000&monthly_opex=10000&hardware_change=-5&initial_infra=100000&initial_change=-1&hodl_ratio=0&discount_rate=0" target="_blank">Mining Profitability Calculator</a>
                                            </figcaption>
                                        </figure>
                                        <p>The advanced version of our mining profitability calculator gives you a much more sophisticated overview of how your mining business will perform in different scenarios. Let’s explain the custom options one-by-one.</p>
                                        <span id="toc-capital-expenditure-capex-"></span>
                                        <h3>Capital Expenditure (CAPEX)</h3>
                                        <p>Capital expenditures are costs you pay to acquire or upgrade your business’ assets. In Bitcoin mining, examples of CAPEX include:</p>
                                        <ul>
                                            <li>Purchasing ASICs and PSUs</li>
                                            <li>Building or purchasing a data center facility to house your hardware</li>
                                            <li>Immersion cooling or HVAC (air cooling) setup</li>
                                            <li>Labor for installation</li>
                                            <li>Taxes and licenses to be legally compliant</li>
                                        </ul>
                                        <span id="toc-monthly-operational-expenditure-opex-"></span>
                                        <h3>Monthly Operational Expenditure (OPEX)</h3>
                                        <p>If you have fixed monthly costs that are independent of your mining revenue, you can factor those in here. Examples of common OPEXs include:</p>
                                        <ul>
                                            <li>Employee salaries</li>
                                            <li>Fixed monthly expenses such as security or insurance</li>
                                        </ul>
                                        <p>Note that this should <em>not</em> include OPEX to run the miners, as that is calculated for you based on your power consumption and electricity price per kWh.</p>
                                        <span id="toc-initial-hardware-value-initial-infrastructure-value"></span>
                                        <h3>Initial Hardware Value &amp; Initial Infrastructure Value</h3>
                                        <p>The <em>Initial Hardware Value</em> input should be the estimated resale value of any mining hardware (ASICs and PSUs) you own. Meanwhile, the <em>Initial Infrastructure Value </em>should be the market value of all your infrastructure such as containers, immersion cooling tanks and fluid, generators, etc.&nbsp;</p>
                                        <span id="toc-hardware-infrastructure-appreciation-depreciation-"></span>
                                        <h3>Hardware &amp; Infrastructure Appreciation / Depreciation (%)</h3>
                                        <p>These two inputs for monthly appreciation / depreciation allow you to change the value of your physical assets over time.&nbsp;</p>
                                        <p>Historically, the value of ASIC hardware is highly dependent on Bitcoin’s price (and to a much lesser extent, the price of other SHA-256 coins including Bitcoin Cash and Bitcoin SV as well). At the same time, ASICs become less valuable when newer and more efficient models reach the market and the network difficulty increases. For instance, Antminer S9s that were originally selling for $2000 - $3000 in 2016 were available for $20 - $50 after the <a href="https://medium.com/braiins/the-bitcoin-halving-part-2-mining-edition-a8f23fd36656" target="_blank"> 2020 halving </a>.&nbsp;</p>
                                        <p>If you calculate mining cash flow for 6 - 12 months, BTC price should be a significant variable that determines the change in value of your hardware. On the other hand, increasing difficulty and newer ASICs hitting the market should be the main factors that contribute to depreciation over longer time periods.&nbsp;</p>
                                        <p>The value of your infrastructure such as containers, buildings, land, etc. is likely less correlated with BTC price compared to ASIC hardware. That’s why we enable you to set a separate rate for appreciation and depreciation of infrastructure.&nbsp;&nbsp;</p>
                                        <span id="toc-hodl-ratio"></span>
                                        <h3>HODL Ratio</h3>
                                        <p>Most miners do not mine bitcoin purely to maximize their fiat profit in the short-term. Instead, it’s very common for miners to hold at least some portion of their profits in BTC on their balance sheet, giving them exposure to potential price appreciation. With this in mind, we created the <em>HODL Ratio</em> as a way for users to determine a percentage of their net profit each month they want to keep in BTC rather than cashing it out. If you set a nonzero value for <em>Price Increment</em> in the basic inputs, the HODL Ratio will impact your <em>End Profit/Loss</em> as the value of BTC on your balance sheet will appreciate or depreciate in fiat terms over time.</p>
                                        <p>To illustrate this, below is a chart with all of the inputs exactly the same as the one posted most recently above. The only difference is that the first had a HODL Ratio of 0%, and this one has a HODL Ratio of 100% (aka a MicroStrategy Treasury Policy).&nbsp;</p>
                                        <figure className="w-richtext-align-center w-richtext-figure-type-image">
                                            <div>
                                                <img src="https://assets.website-files.com/5e5fcd39a7ed2643c8f70a6a/6040d7d5fd8df95c3c6a35a6_8KiVHoI0JHbTRwjQjTo5CZ4yqYvGvoV4xNCXvp-ga_YWIfIObZaVRtSBLRcQdeiT3-qFTOdwEMDsbUdh49M3qvzeRwFuXrFQFrXYoc3tX-oHa_-itu58KOBTBpbawhaaBYteWYE.png" alt="" />
                                            </div>
                                            <figcaption>
                                                Source: <a href="https://insights.braiins.com/profitability-calculator?btc_price=49075&amp;network_difficulty=21724134900047&amp;hashrate=6800&amp;consumption=336000&amp;electricity=0.03&amp;block_reward=6.25&amp;pool_fee=2&amp;tx_fees=0&amp;time_period=12&amp;other_fees=0&amp;diff_increment=4&amp;capex=350000&amp;starting_assets=0&amp;asset_change=0&amp;price_increment=6&amp;initial_hardware=100000&amp;monthly_opex=10000&amp;hardware_change=-5&amp;initial_infra=100000&amp;initial_change=-1&amp;hodl_ratio=100&amp;discount_rate=0" target="_blank">Profitability Calculator with HODL Ratio = 100%</a>
                                            </figcaption>
                                        </figure>
                                        <p>For a much deeper overview of different strategies for treasury management, we strongly recommend that you read <a href="https://www.aniccaresearch.tech/blog/the-intelligent-bitcoin-miner-part-i" target="_blank">The Intelligent Bitcoin Miner</a> by Anicca Research.</p>
                                        <span id="toc-discount-rate"></span>
                                        <h3>Discount Rate</h3>
                                        <p>If you set a nonzero <em>Discount Rate</em>, it will not impact the stats or the data series on the chart. However, we calculate NPV (Net Present Value) in the backend, and we print this value in the CSV file which you can download (see the <em>Download CSV</em> text right above the stats.)</p>
                                        <p>In Discounted Cash Flow Analysis, the <em>Discount Rate</em> is an interest rate used to determine the present value of future cash flows.</p>
                                        <span id="toc-projecting-possible-scenarios"></span>
                                        <h2>Projecting Possible Scenarios</h2>
                                        <p>Finally, we’ll leave you with an example of how you can use the Braiins mining cash flow calculator to visualize projections for multiple different scenarios for BTC price action in the future. Whether you want to present financial projections to prospective investors or just inform yourself in order to make better decisions when managing your business, this can aid you in that venture.&nbsp;</p>
                                        <h4><strong>Scenario 1: Difficulty Rises Faster than Price</strong></h4>
                                        <figure className="w-richtext-align-center w-richtext-figure-type-image">
                                            <div>
                                                <img src="https://assets.website-files.com/5e5fcd39a7ed2643c8f70a6a/6040d7d68705f4aed8115f52_k9wtEvm1EGUX7yovDA6EC3tQzHPUna4F6zkGMIucD3dEXCR5VDD0OnHm22_4ieZWYtHblKQj1IvSOrNMKFuHF-8DfpLAsWVO9AIYQjDPGfId4WbROU5og2apiRqB7Zv43kNhIMg.png" alt="" />
                                            </div>
                                            <figcaption>
                                                Link: <a href="https://insights.braiins.com/profitability-calculator?btc_price=49075&amp;network_difficulty=21724134900047&amp;hashrate=6800&amp;consumption=336000&amp;electricity=0.055&amp;block_reward=6.25&amp;pool_fee=2&amp;tx_fees=0.7&amp;time_period=24&amp;other_fees=0&amp;diff_increment=6&amp;capex=300000&amp;starting_assets=0&amp;asset_change=0&amp;price_increment=2&amp;initial_hardware=150000&amp;monthly_opex=15000&amp;hardware_change=-6&amp;initial_infra=80000&amp;initial_change=-1&amp;hodl_ratio=50&amp;discount_rate=0" target="_blank">Profitability Calculator Difficulty Increment &gt; Price Increment</a>
                                            </figcaption>
                                        </figure>
                                        <p>Since difficulty is increasing faster than price, the revenue and profit per month decreases when holding hashrate constant. This is also likely to result in <em>Hardware Value</em> depreciation, as the ASICs are becoming less profitable over time.</p>
                                        <h4><strong>Scenario 2: Price Rises Faster than Difficulty</strong></h4>
                                        <figure className="w-richtext-align-center w-richtext-figure-type-image">
                                            <div>
                                                <img src="https://assets.website-files.com/5e5fcd39a7ed2643c8f70a6a/6040d7d5296566343aa55830_2e8Jc_c4jmxMIej7NjVqz3kO6WeTsGtpdMLIy77Y8B851k-QDULUYX7F5jxWvQ9T5Y-oqjoLTaL0M3xRj3aKFaluNKl-Zgc3lCxDZekq-MXjqlg6JHHCDNFtQPOjdXF_UbICW4g.png" alt="" />
                                            </div>
                                            <figcaption>
                                                Link: <a href="https://insights.braiins.com/profitability-calculator?btc_price=49075&amp;network_difficulty=21724134900047&amp;hashrate=15000&amp;consumption=800000&amp;electricity=0.05&amp;block_reward=6.25&amp;pool_fee=2&amp;tx_fees=0.8&amp;time_period=24&amp;other_fees=10&amp;diff_increment=3&amp;capex=1000000&amp;starting_assets=0&amp;asset_change=0&amp;price_increment=6&amp;initial_hardware=400000&amp;monthly_opex=20000&amp;hardware_change=-5&amp;initial_infra=0&amp;initial_change=0&amp;hodl_ratio=50&amp;discount_rate=0" target="_blank">Profitability Calculator Price Increment &gt; Difficulty Increment</a>&nbsp;
                                    </figcaption>
                                        </figure>
                                        <p>With price outpacing difficulty, the profitability of hashrate is increasing over time and the <em>Hardware Value </em>is depreciating much more slowly than in the previous case, leading to cumulative profit and net cash flow both accelerating upward each month.</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfitabilityCalculatorBlog);