const axios = require('axios');
const baseRoute = 'http://localhost:5000';


describe('Stylist Routes', () => {
  describe('GET /', () => {
    it('Should return the JSON object "success": true', async (done) => {
      const response = await axios({
        method: 'get',
        url: `${baseRoute}/`
      });

      expect(response.data).toEqual({ success: true });
      done();
    })
  })
})