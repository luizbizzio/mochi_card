SnapExtensions.primitives.set(
    'mc_split(textToSplit, index)',
    function (textToSplit, index ,proc) {
      var tokensArray = textToSplit.slice(3).split(",");
      if (index > tokensArray.length-1) {
        return -1; // error, index over array length
      } else {
        return tokensArray[index];	
      }
    }
  );