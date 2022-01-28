export const requests = {
  queries: (query) => {
    return (
      `query{
        ${query}
      }`
    )
  },
  mutation: (query, condition) => {
    return (
      `mutation{
        ${query}
      }
      `
    )
  }
}
