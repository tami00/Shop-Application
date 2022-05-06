import React, {useState, useEffect} from 'react'
import {Checkbox, Collapse} from 'antd'
const {Panel} = Collapse

function CheckBox(props) {

    const [checked,setChecked] = useState([])

const catergories = [
    {
        "id": 1,
        "name": "Electronics"
    },
    {
        "id": 2,
        "name": "Books"
    },
    {
        "id": 3,
        "name": "Toys"
    },
    {
        "id": 4,
        "name": "Clothes"
    },
]

const handleChange = (value) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
        props.handleFilters(newChecked)
}




// const renderCheckbox = () => {catergories.map((value, index) => (
//     <React.Fragment key={index}>
//         <Checkbox
//          onChange={()=>handleChange(value.id)}
//          type="checkbox"
//          checked
//         >
//         </Checkbox>
//         <span>{value.name}</span>
//     </React.Fragment> 
//  ))}


  return (
    <div>
        <Collapse defaultActiveKey={['0']}>
        <Panel header key ="1">
        {catergories.map((value, index) => (
    <React.Fragment key={index}>
        <Checkbox
         onChange={()=>handleChange(value.id)}
         type="checkbox"
         checked={checked.indexOf(value.id) === -1 ? false : true}
        >
        </Checkbox>
        <span>{value.name}</span>
    </React.Fragment> 
 ))}
        </Panel>
        </Collapse>

    </div>
  )
}

export default CheckBox