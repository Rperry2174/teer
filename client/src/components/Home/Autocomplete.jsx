import React from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'
import { geocodeByAddress, geocodeByPlaceId } from 'react-places-autocomplete'

class Autocomplete extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      geocodeResults: null,
      loading: false
    }
    this.cancelCalendar = this.cancelCalendar.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.renderGeocodeFailure = this.renderGeocodeFailure.bind(this)
    this.renderGeocodeSuccess = this.renderGeocodeSuccess.bind(this)
  }

  handleSelect(address) {
    this.setState({
      address,
      loading: true
    })
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log('Success Yay', { lat, lng })
        this.setState({
          geocodeResults: this.renderGeocodeSuccess(lat, lng),
          loading: false
        })
      })
      .catch((error) => {
        console.log('Oh no!', error)
        this.setState({
          geocodeResults: this.renderGeocodeFailure(error),
          loading: false
        })
      })

    /* NOTE: Using callback (Deprecated version) */
    // geocodeByAddress(address,  (err, { lat, lng }) => {
    //   if (err) {
    //     console.log('Oh no!', err)
    //     this.setState({
    //       geocodeResults: this.renderGeocodeFailure(err),
    //       loading: false
    //     })
    //   }
    //   console.log(`Yay! got latitude and longitude for ${address}`, { lat, lng })
    //   this.setState({
    //     geocodeResults: this.renderGeocodeSuccess(lat, lng),
    //     loading: false
    //   })
    // })
  }

  handleChange(address) {
    this.setState({
      address,
      geocodeResults: null
    })
  }

  renderGeocodeFailure(err) {
    return (
      <div className="alert alert-danger" role="alert">
        <strong>Error!</strong> {err}
      </div>
    )
  }

  renderGeocodeSuccess(lat, lng) {
    return (
      <div className="alert alert-success" role="alert">
        <strong>Success!</strong> Geocoder found latitude and longitude: <strong>{lat}, {lng}</strong>
      </div>
    )
  }

  cancelCalendar(){
    console.log('Focused!');
    this.props.onClick(this.state)
  }

  render() {
    const cssClasses = {
      root: 'location-search-input',
      input: 'Demo__search-input',
      autocompleteContainer: 'Demo__autocomplete-container',
    }

    const AutocompleteItem = ({ formattedSuggestion }) => (
      <div className="Demo__suggestion-item">
        <i className='fa fa-map-marker Demo__suggestion-icon'/>
        <strong>{formattedSuggestion.mainText}</strong>{' '}
        <small className="text-muted">{formattedSuggestion.secondaryText}</small>
      </div>)

    const inputProps = {
      type: "text",
      value: this.state.address,
      onChange: this.handleChange,
      onBlur: () => { console.log('Blur event!'); },
      onFocus: () => { this.cancelCalendar() },
      autoFocus: true,
      placeholder: "Search Places",
      name: 'Demo__input',
      id: "my-input-id",
    }

    return (
      <div className='location-search-input'>

          <PlacesAutocomplete
            onSelect={this.handleSelect}
            autocompleteItem={AutocompleteItem}
            onEnterKeyDown={this.handleSelect}
            classNames={cssClasses}
            inputProps={inputProps}
          />
          {this.state.loading ? <div><i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" /></div> : null}
          {!this.state.loading && this.state.geocodeResults ?
            <div className='geocoding-results'>{this.state.geocodeResults}</div> :
          null}


      </div>
    )
  }
}

export default Autocomplete