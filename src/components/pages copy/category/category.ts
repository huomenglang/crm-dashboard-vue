export interface CategoryProps {
  id: string
  name: string
  image: string
  description: string
}

export const categoryColums=[
       
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        { title: 'Image', dataIndex: 'image', key: 'image',width:60 },
        {
          title: 'Action',
          key: 'operation',
          dataIndex: 'action'
        }
      ]