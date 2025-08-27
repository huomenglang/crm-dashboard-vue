
export interface WarehouseProps {
  id: string
  name: string
  location?: string
  description?: string
}

export const warehouseColumns=[
       
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Location', dataIndex: 'location', key: 'location' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        {
          title: 'Action',
          key: 'operation',
          dataIndex: 'action'
        }
      ]