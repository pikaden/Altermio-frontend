import { useEffect, useState } from "react";
import "./MyProducts.css";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, Button } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';

const MyProducts = () => {
  const [items, setItems] = useState();
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams()
  let accessToken = localStorage.getItem("accessToken");

  const handlePageChange = (event, value) => {
    setPage(value);

    searchParams.set('page', value);
    setSearchParams(searchParams, value);
  };

  const getMyProducts = async () => {
    const page = searchParams.get('page');
    const limit = searchParams.get('limit');
    const sortBy = searchParams.get('sortBy');

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        access_token: accessToken,
      },
      params: {
        page: page,
        limit: limit,
        sortBy: sortBy
      },
    }

    await axios.get(
      `http://localhost:3000/v1/products/manageProducts/myProducts`,
      config
    ).then(res => {
      setItems(res.data);
    }).catch(err => console.log(err));
  };

  useEffect(() => {
    getMyProducts();
  }, [searchParams])

  return (
    <Box>
      <Box style={{ marginLeft: 50, fontSize: 30 }}>My products</Box>
      <TableContainer component={Paper} style={{ padding: 30 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Verification</TableCell>
            </TableRow>
          </TableHead>
          {items && (
            <TableBody>
              {items.results.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Link to={`/item/${product.id}`} >
                      {product.name}
                    </Link>
                  </TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.state}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>
                    {product.verify === 'pending' ?
                      <div className={`verification-badge pending`}>
                        Pending
                      </div>
                      :
                      product.verify === 'accept' ?
                        <div className={`verification-badge verified`}>
                          Verified
                        </div>
                        :
                        <div className={`verification-badge not-verified`}>
                          Not Verified
                        </div>
                    }
                  </TableCell>
                  <TableCell>
                    <Link to={`/products/manage/${product.id}`}>
                      <BuildIcon />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
        {items &&
          <Pagination
            style={{
              marginTop: '2rem',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
            count={items.totalPages}
            page={page}
            size='large'
            onChange={handlePageChange}
            showFirstButton
            showLastButton
          />
        }
      </TableContainer>
    </Box>
  );
};

export default MyProducts;
