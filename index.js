const axios = require("axios");

//API Call Section
//Step 01- First Get Call
async function getClue() {
  let str = "";
  await axios
    .get("http://host.docker.internal:3272/step1", {
      headers: {
        "craftsmen-api-key": "UGxlYXNlRG9uJ3RDaGFuZ2VUaGlzVmFsdWU=",
        email: "sakibul.munnaa@gmail.com",
      },
    })
    .then((res) => {
      //console.log(`statusCode: ${res.status}`);
      //console.log(res.data.problem);
      str += res.data.problem;
    })
    .catch((error) => {
      console.error(error);
    });

  return str;
}

//Step 02 - Posting the depth of the given problem.
async function postAns(dep) {
  axios
    .post(
      "http://host.docker.internal:3272/step1",
      {
        depth: dep,
      },
      {
        headers: {
          "craftsmen-api-key": "UGxlYXNlRG9uJ3RDaGFuZ2VUaGlzVmFsdWU=",
          email: "sakibul.munnaa@gmail.com",
        },
      }
    )
    .then((res) => {
      console.log(`statusCode: ${res.status}`);
      //console.log(res);
    })
    .catch((error) => {
      console.error(error);
    });
}

//Step 03 - Posting the difference between left and right angular brackets of the given problem.
async function postAns2(dep) {
  axios
    .post(
      "http://host.docker.internal:3272/step2",
      {
        difference: dep,
      },
      {
        headers: {
          "craftsmen-api-key": "UGxlYXNlRG9uJ3RDaGFuZ2VUaGlzVmFsdWU=",
          email: "sakibul.munnaa@gmail.com",
        },
      }
    )
    .then((res) => {
      console.log(`statusCode: ${res.status}`);
      console.log(res);
    })
    .catch((error) => {
      console.error(error);
    });
}

//Now the helper methods...

//The method to find the maximum Depth
function maxDepth(s) {
  let count = 0;
  let st = [];

  for (let i = 0; i < s.length; i++) {
    if (s[i] == "<") st.push(i);
    else if (s[i] == ">") {
      if (count < st.length) count = st.length;
      st.pop();
    }
  }

  return count;
}

// Finding the differences between left and right count seciton
// I have used some global variables here which I know is a type of bad coding but I hope you will understand the storm going through head. Sorry for bad coding styles for now.

let left_count = 0;
let right_count = 0;

function getCount(s) {
  if (s.length < 1) {
    return;
  }
  if (s[0] == "<") {
    left_count += 1;
  } else if (s[0] == ">") {
    right_count += 1;
  }
  getCount(s.substring(1));
}

function getDiff(s) {
  getCount(s);
  let diff = Math.abs(right_count - left_count);
  return diff;
}

//The main method to call everything. too much dependecny :')
async function main() {
  let s = await getClue();
  let d = await maxDepth(s);
  await postAns(d / 2);
  let diff = getDiff(s);
  postAns2(diff);
}

main();
