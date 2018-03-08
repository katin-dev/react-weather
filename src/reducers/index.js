import data from '../weather-data';
export default function (state = { data: data }, action) {
  switch(action.type) {
    case 'update':
      let newData = state.data.concat([
        [action.payload.label, action.payload.value]
      ]);

      // Делаем ограничение по размеру массива
      if (newData.length > 1000 )  {
        newData.shift();
      }
      
      return Object.assign({}, state, { data: newData });
    default:
      return state;
  }
}
