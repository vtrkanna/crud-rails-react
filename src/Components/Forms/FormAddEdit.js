import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { API_URL } from '../../config'

class AddEditForm extends React.Component {
  state = {
    id: 0,
    pri: '',
    title: '',
    appears_day: '',
    frequency: '',
    rating_type: '',
    teaming_stages: '',
    required: '',
    conditions: ''

  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    fetch(API_URL + '/questions', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pri: this.state.pri,
        title: this.state.title,
        appears_day: this.state.appears_day,
        frequency: this.state.frequency,
        rating_type: this.state.rating_type,
        teaming_stages: this.state.teaming_stages,
        required: this.state.required,
        conditions: this.state.conditions
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          this.props.addItemToState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    fetch(API_URL + '/questions', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.id,
        pri: this.state.pri,
        title: this.state.title,
        appears_day: this.state.appears_day,
        frequency: this.state.frequency,
        rating_type: this.state.rating_type,
        required: this.state.required,
        conditions: this.state.conditions,
        teaming_stages: this.state.teaming_stages,
        role: this.state.role,
        mapping: this.state.mapping
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          // console.log(item[0])
          this.props.updateState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const {
        id, pri, title, frequency, appears_day,
        rating_type, conditions, required, teaming_stages, role, mapping
      } = this.props.item
      this.setState(
        {
          id, pri, title, frequency, appears_day, rating_type, conditions,
          required, teaming_stages, role, mapping
        }
      )
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="pri">Pri</Label>
          <Input type="text" name="pri" id="pri" required onChange={this.onChange} value={this.state.pri === null ? '' : this.state.pri} />
        </FormGroup>
        <FormGroup>
          <Label for="last">Title</Label>
          <Input type="text" name="title" id="title" required onChange={this.onChange} value={this.state.title === null ? '' : this.state.title}  />
        </FormGroup>
        <FormGroup>
          <Label for="appears_day">Appears Day</Label>
          <Input type="integer" name="appears_day" id="appears_day" onChange={this.onChange} value={this.state.appears_day === null ? '' : this.state.appears_day}  />
        </FormGroup>
        <FormGroup>
          <Label for="phone">Frequency</Label>
          <Input type="integer" name="frequency" id="frequency" onChange={this.onChange} value={this.state.frequency === null ? '' : this.state.frequency}  placeholder="ex. 1" />
        </FormGroup>
        <FormGroup>
          <Label for="rating_type">Rating Type</Label>
          <Input type="text" name="rating_type" id="rating_type" onChange={this.onChange} value={this.state.rating_type === null ? '' : this.state.rating_type}  placeholder="Rating Type" />
        </FormGroup>
        <FormGroup>
          <Label for="required">Required</Label>
          <Input type="text" name="required" id="required" onChange={this.onChange} value={this.state.required}  />
        </FormGroup>
        <FormGroup>
          <Label for="conditions">Conditions</Label>
          <Input type="text" name="conditions" id="conditions" onChange={this.onChange} value={this.state.conditions}  />
        </FormGroup>
        <FormGroup>
          <Label for="required">Teaming Stages</Label>
          <Input type="text" name="teaming_stages" id="teaming_stages" onChange={this.onChange} value={this.state.teaming_stages}  />
        </FormGroup>
        <FormGroup>
          <Label for="required">Role</Label>
          <Input type="text" name="role" id="role" required onChange={this.onChange} value={this.state.role}  />
        </FormGroup>
        <FormGroup>
          <Label for="mapping">Mapping</Label>
          <Input type="text" name="mapping" id="mapping" required onChange={this.onChange} value={this.state.mapping}  />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm
