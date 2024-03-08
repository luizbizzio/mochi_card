SnapExtensions.primitives.set(
  'mc_setMochiLogo()',
  function () {
    IDE_Morph.prototype.createLogo = function () {
      var myself = this;

      if (this.logo) {
        this.logo.destroy();
      }

      this.logo = new Morph();

      this.logo.texture = "data:image/png;base64," +
        "UklGRmAEAABXRUJQVlA4TFMEAAAvx8AGAPVQgrXt2Bx1/ti2bdu2bdu2bdu2bdu2bZvdnf/PX7P6uiqrUcy3" +
        "ZuWuexHzq8yqq9+xregd4xl75RkCSZv3z/xtBJK28O79nwCNbf918y2jcsjqpjNIpD3QbFlLZxBDW/kuSlU6" +
        "AxMtSmLLzKYzkPaKTcoYH1fjszmY2wDstqAJECttHybHe+IqnnzG1LYv85uHBM8lV834pmR4S5Um8BalICli" +
        "DwMwuSVTWpnbpMST7W05baB5KGvWm8EteabRVtpMIyhUVPhNF6yl3XRmHXU1v02Flclcw2k1HTiwjDohWBQN" +
        "cN6WkuZWFgCstvEm3rTcgHDZRmfil4Tw3WYTaTJNx1kb5LLNRMRoKYIEQDi3iATJMtGh0AHgYnpDJhKCxCqK" +
        "JMB/3hYVBcBjW02abrE5aUD6YlSgpIOlrT+RvMom2nbag12kxzdRCxtDnAaZpQ0u2gyiHdTZkiZFutlOohed" +
        "N9hs/Yz4dhpPLa0lJtExza0pFBtCRVdUFoAIucl/dz5AdjEqIenwxa/yeooZy1s1k8+c4RXN0OYx84jffAFl" +
        "RXINMzOAuVYbMuUXiojz5ZRKVrbffru3oAbS+xob3r8pagJATmk6eQW5DpDXGJ2SDMa2s0TNzfAGh20mcXkZ" +
        "uR2grDEqWlZniom/HTQAcJRZxm7ZnlnEDiQTlBXN5AYgUnYSn2ClrYJVt2mkyeRV9DhQUESVTDI4noXEj8UJ" +
        "YGCrbUR9YGIDwmU78aTOa9tAoj70lRRbY20hb+0NPU03iMxuKlQe/vUMF0LQmT1YTR4aUMyIqkgyBG7fy388" +
        "BCBLkWgEfcD9/HEmUntJjwobVBbXH05b8uL0P9SNmJvyfzNpDs2nBaQnX/UcoJSIqphkiJFj/FF7AyBwPt5F" +
        "2QXguSUkx2z+8r2oIFVX15CzSRSZGpuiqRNeN6kP2W92xm78ZinxdeQ1GhvKmJSIpzP873sBHPefw3cBOG9L" +
        "SeSO4+iLQXZDydwMwza6eWwzsVl4VIW18ZgrQMjoUm8yugFOmr6KCiYlImcn8bn4AWp6aWtJdDULWyfQgSRS" +
        "ShZdlkHmZxQxuQ2cx/B2/NPDQ+nVbNLYEDzbHg2GqQFcthP8Va8DVICU8J71j68kt02dN3TZVPo0QjYTW0bp" +
        "5Xgct7snNN0mehwJckCW51FHamPj6HsmapqBDS8doBFmdjQ2uGon+FruJUApI6psksHy/Mz0IkmdDKXJqJMZ" +
        "bUbmE5ntpEV06Fd2pqyMbPi4iA4QI2KMDzY3Dfhcl40lCw1wmRN8JbkeIH8RlTbJgDzGRLZSJ4vEmaQCzE0Z" +
        "vUpC0FoqqRsAjG5xMtQ20pkzm2gi5ZetAeC9vSoGmKkBbM9MEj9bacAXmozSSTpYmkJqBHejjq3tj9wy2wAY" +
        "bgFTzrpSFyunY4Y2qLQwN+MmXp6xNlA21lKovi4BUGyRU9tCBoDl7WJBWR/pANzGPWu0GRns/w0A";

      this.logo.render = function (ctx) {
        var gradient = ctx.createLinearGradient(
          0,
          0,
          this.width(),
          0
          );
        gradient.addColorStop(0, 'black');
        gradient.addColorStop(0.5, myself.frameColor.toString());
        ctx.fillStyle = MorphicPreferences.isFlat ?
          myself.frameColor.toString() : gradient;
        ctx.fillRect(0, 0, this.width(), this.height());
        if (this.cachedTexture) {
          this.renderCachedTexture(ctx);
        } else if (this.texture) {
          this.renderTexture(this.texture, ctx);
        }
      };

      this.logo.renderCachedTexture = function (ctx) {
        ctx.drawImage(
          this.cachedTexture,
          5,
          Math.round((this.height() - this.cachedTexture.height) / 2)
          );
        this.changed();
      };

      this.logo.mouseClickLeft = function () {
        myself.snapMenu();
      };

      this.logo.color = BLACK;
      this.logo.setExtent(new Point(200, 28)); // dimensions are fixed
      this.add(this.logo);
    };
    var stage = this.parentThatIsA(StageMorph),
      ide = stage.parentThatIsA(IDE_Morph),
      world = stage.parentThatIsA(WorldMorph);
    ide.createLogo();
    ide.createControlBar();
    ide.fixLayout();
  }
);

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
