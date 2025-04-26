

export const rateCircle = (assessments) => {
    const good_rates = (assessments.filter(el => el.rate == 'like')).length
    const bad_rates = (assessments.filter(el => el.rate == 'dislike')).length

    if (good_rates + bad_rates == 0) {
        return <RateCircle rate='-' />
    }

    let rate = (good_rates / (good_rates + bad_rates)) * 5

    switch (true) {
        case (4.0 < rate):
            rate = String(rate).slice(0, 3)
            return <RateCircle rate={rate} color='green'/>
        case (3.0 < rate): 
            rate = String(rate).slice(0, 3)
            return <RateCircle rate={rate} color='yellow'/>
        case (0.0 <= rate): 
            rate = String(rate).slice(0, 3)
            return <RateCircle rate={rate} color='red'/>
    }
}

const RateCircle = (props) => {
    const {
        color,
        rate
    } = props

    return (
        <div className={`assessment__circle ${color}`} >
            {rate}
        </div>
    )
}