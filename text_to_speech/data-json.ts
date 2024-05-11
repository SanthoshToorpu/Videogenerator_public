import axios from 'axios';

// Define a type alias for the array elements
type DataItem = {
  name: string;
  dialogue: string[];
};

const data: DataItem[] = [];

(async () => {
  try {
    const response = await axios.get('http://localhost:3001/dialogues');
    response.data.forEach((item: any) => {
      data.push({
        name: item.customersName,
        dialogue: item.dialogues,
      });
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();

export default data;
