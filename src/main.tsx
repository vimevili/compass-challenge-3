import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

// const client = new ApolloClient({
//   uri: "http://localhost:4000/",
//   cache: new InMemoryCache(),
// });

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <ApolloProvider client={client}>
//       <html lang="en">
//         <body>{children}</body>
//       </html>
//     </ApolloProvider>
//   );
// }
import { BrowserRouter } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')!).render(
      <BrowserRouter>
          <App />
      </BrowserRouter>      
)
