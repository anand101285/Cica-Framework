import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

// material
import {
  Stack,
  Typography,
  Button,
  TextField,
  Grid,
  MenuItem,
  Card,
  CardContent,
  Select
} from '@mui/material';
// components

import { GET_NEW_BEACON_FILE } from '../../redux/actions/newbeacon';

import { getDetails } from 'src/docs/honeytokenDocs';
// ----------------------------------------------------------------------

const GenerateHoneytoken = (props) => {
  const [filetype, setfiletype] = useState('');
  const [filename, setfilename] = useState('');
  const [tokenUrl, setTokenUrl] = useState('');
  const [selectedTokenDetail, setSelectedTokenDetail] = useState();
  const [isDownload, setIsDownload] = useState(true);
  const honeytokensCode = {
    web_gif: {
      code: (
        <>
          <Card
            variant="outlined"
            style={{
              backgroundColor: 'whitesmoke',
              color: 'black',
              padding: '20px',
              marginTop: '15px'
            }}>
            <Typography variant="h5">In Html Source Code</Typography>
            <Typography variant="p" sx={{ mb: 3 }}>
              &lt;img src=`{tokenUrl}` /&gt;
            </Typography>
          </Card>
        </>
      )
    },
    content_without_source: {
      code: (
        <>
          <Card
            variant="outlined"
            style={{
              backgroundColor: 'whitesmoke',
              color: 'black',
              padding: '20px',
              marginTop: '15px'
            }}>
            <Typography variant="h5">In the style.css insert following</Typography>
            <Typography variant="p" sx={{ mb: 3 }}>
              <div>body &#123;</div>
              <div>background-image: url&#40;&quot;{tokenUrl}&quot;&#41;</div>
              <div>&#x7D;</div>
            </Typography>
            <Typography variant="h5">In Response following Header should be added</Typography>
            <Typography variant="p" sx={{ mb: 3 }}>
              <div>&quot;Content-Type&quot;, &quot;text/html; charset=utf-8&quot;</div>
              <div>&quot;link&quot;, &quot;&lt;/path/to/style.css&gt; rel=stylesheet&quot;</div>
            </Typography>
          </Card>
        </>
      )
    },
    dnsToken: {
      code: (
        <>
          <Card
            variant="outlined"
            style={{
              backgroundColor: 'whitesmoke',
              color: 'black',
              padding: '20px',
              marginTop: '15px'
            }}>
            <Typography variant="h5">Use the Following Dns</Typography>
            <Typography variant="p" sx={{ mb: 3 }}>
              {tokenUrl}
            </Typography>
          </Card>
        </>
      )
    },
    registry_process: {
      code: (
        <>
          <Card
            variant="outlined"
            style={{
              backgroundColor: 'whitesmoke',
              color: 'black',
              padding: '20px',
              marginTop: '15px'
            }}>
            <Typography variant="h5">Follow the Following Steps</Typography>
            <Typography variant="p" sx={{ mb: 3 }}>
              <div>1- Download and rename the file to .reg extension</div>
              <div>2- Double Click on that file and run as administrator</div>
              <div>3- The Registry Settings will be added and the token will be ready</div>
              <div>On use of klist command the token will be activated</div>
            </Typography>
          </Card>
        </>
      )
    },
    windows_batch: {
      code: (
        <>
          <Card
            variant="outlined"
            style={{
              backgroundColor: 'whitesmoke',
              color: 'black',
              padding: '20px',
              marginTop: '15px'
            }}>
            <Typography variant="h5">Follow the Following Steps</Typography>
            <Typography variant="p" sx={{ mb: 3 }}>
              <div>1- Download the batch file </div>
              <div>2- Place the batch file and rename it to something attractive to attacker</div>
            </Typography>
          </Card>
        </>
      )
    }
  };

  const handleChange = async (event) => {
    const tokenValue = event.target.value;
    setfiletype(tokenValue);
    setIsDownload(props.honeytokens[tokenValue].downloadable);
    setSelectedTokenDetail(getDetails(tokenValue, props.honeytokens[tokenValue]));
  };

  const onClickHandler = async (e) => {
    e.preventDefault();
    if ((filename !== '' && isDownload) || !isDownload) {
      const successfull = props.GET_NEW_BEACON_FILE(
        props.user.userId,
        filename,
        filetype,
        isDownload
      );
      if (successfull) {
        setfilename('');
        setfiletype('');
        setTokenUrl('');
        setIsDownload(true);
      }
    }
  };

  useEffect(() => {
    setTokenUrl(props.url);
  }, [props, props.url]);
  return (
    <>
      <form>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={5}
          marginTop={5}
          marginBottom={2}>
          <Grid item sm={6} md={4}>
            {isDownload && (
              <>
                <Typography variant="h5" sx={{ mx: 5, my: 2 }}>
                  Enter File Name:
                </Typography>
                <TextField
                  label="i.e Mydocs"
                  variant="outlined"
                  sx={{ width: 260 }}
                  value={filename}
                  required
                  onChange={(e) => setfilename(e.target.value)}
                />
              </>
            )}
          </Grid>
          <Grid item sm={6} md={4}>
            <Typography variant="h5" sx={{ mx: 5, my: 2 }}>
              Select File Type:
            </Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              sx={{ width: 260 }}
              label="Select"
              value={filetype}
              onChange={handleChange}
              MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}>
              {Object.keys(props.honeytokens).map((key, index) => {
                return (
                  <MenuItem value={key} key={index} sx={{ backgroundColor: '#04131f' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Icon icon={props.honeytokens[key].icon} width={24} height={24} />
                      <div style={{ marginLeft: '10px' }}>{props.honeytokens[key].name}</div>
                    </div>
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
        </Grid>
        {selectedTokenDetail && (
          <>
            <Card variant="outlined" style={{ backgroundColor: '#061420' }}>
              <CardContent>
                <Typography variant="h5" sx={{ mt: 1 }}>
                  Description:
                </Typography>
                <Typography variant="p" sx={{ mb: 3 }}>
                  {selectedTokenDetail.description}
                </Typography>
                <Typography variant="h5" sx={{ mt: 4 }}>
                  Attack Path:
                </Typography>
                <Typography variant="p" sx={{ mb: 3 }}>
                  {selectedTokenDetail.attackPath}
                </Typography>
                <Typography variant="h5" sx={{ mt: 4 }}>
                  Usage Details:
                </Typography>
                <Typography variant="p" sx={{ mb: 3 }}>
                  {selectedTokenDetail.use}
                </Typography>

                {honeytokensCode[filetype] && honeytokensCode[filetype].code}
              </CardContent>
            </Card>
          </>
        )}
        <Stack direction="row" alignItems="center" justifyContent="center" mb={5}>
          <Button
            variant="variant"
            className="blue-button"
            sx={{ width: 280, height: 60, mt: 3, justifySelf: 'center', fontSize: 15 }}
            onClick={(e) => onClickHandler(e)}>
            Generate Beacon
          </Button>
        </Stack>
      </form>
    </>
  );
};

GenerateHoneytoken.propTypes = {
  GET_NEW_BEACON_FILE: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  file: PropTypes.string.isRequired,
  url: PropTypes.string,
  honeytokens: PropTypes.object
};

const mapStateToProps = (state) => ({
  file: state.NEWBEACONREDUCER.file,
  user: state.AUTHREDUCER.user,
  url: state.NEWBEACONREDUCER.url
});

const mapDispatchToProps = (dispatch) => ({
  GET_NEW_BEACON_FILE: bindActionCreators(GET_NEW_BEACON_FILE, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(GenerateHoneytoken);
