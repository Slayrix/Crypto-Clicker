var val = {};
val.crypto = 0;
val.cryptoPerClick = 1;
val.upgradeCryptoPerClickCost = .06;
val.cryptoGainedPerSecond = 0;
val.upgradeIdleCost = .05;
val.money = 0;
val.autoMiners = 0;
val.autoMinerGainPerSecond = .1;
val.secondsUntilAutoMinerBoost = 0;
val.autoMinerBoost = 0;
val.buttonClickDelay = 0;
val.autoMinerUpgradeBought = 0;
val.autoMinerBoosterFirstBuy = 0;
hideElements();
tickUpdate();
enableCheats();

document.getElementById("mineCryptoButton").addEventListener("click", addCrypto);
document.getElementById("upgradeButton").addEventListener("click", buyButtonUpgrade);
document.getElementById("autoMinerBuyButton").addEventListener("click", buyAutoMiner);
document.getElementById("sellCryptoButton").addEventListener("click", sellCrypto);
document.getElementById("autoMinerBoosterBuyButton").addEventListener("click", buyAutoMinerBooster);
document.getElementById("autoMinerUpgradeButton").addEventListener("click", buyAutoMinerUpgrade);
document.getElementById("cheatButton").addEventListener("click", cheat);

function hideElements() {
    document.getElementById("autoMinerBoostTimer").hidden = true;
    document.getElementById("autoMinerUpgradeButton").hidden = true;
    document.getElementById("autoMinerBoosterBuyButton").hidden = true;
    document.getElementById("money").hidden = true;
    document.getElementById("cryptoPerSecond").hidden = true;
    document.getElementById("autoMinerBuyButton").hidden = true;
    document.getElementById("cryptoPerClick").hidden = true;
    document.getElementById("upgradeButton").hidden = true;
    document.getElementById("cheatTextBox").hidden = true;
    document.getElementById("cheatButton").hidden = true;
    document.getElementById("sellCryptoButton").hidden = true;
    document.getElementById("crypto").hidden = true;
    document.getElementById("shopHeader").hidden = true;
    document.getElementById("currencySelector").hidden = true;
}

function enableCheats() {
    document.getElementById("cheatTextBox").hidden = false;
    document.getElementById("cheatButton").hidden = false;
    document.getElementById("currencySelector").hidden = false;
}

//Tick function
setInterval(function(){
    autoMinerBoostCountdown();
    mineButtonCountdownTimer();
    calculateCrypto();
    tickUpdate();
}, 1000);

function autoMinerBoostCountdown() {
    if (val.autoMinerBoosterFirstBuy == 1) {
        val.secondsUntilAutoMinerBoost = val.secondsUntilAutoMinerBoost - 1;
        if (val.secondsUntilAutoMinerBoost <= 0) {
            val.autoMinerGainPerSecond = val.autoMinerGainPerSecond + val.autoMinerBoost;
            idleGainPerSecondCalc();
            val.secondsUntilAutoMinerBoost = 60;
        }
    }
}

function idleGainPerSecondCalc() {
    val.cryptoGainedPerSecond = val.autoMinerGainPerSecond * val.autoMiners;
    tickUpdate();
}

function mineButtonCountdownTimer() {
    val.buttonClickDelay = val.buttonClickDelay - 1;
}

function calculateCrypto() {
    val.crypto = val.crypto + val.cryptoGainedPerSecond;
}

function tickUpdate() {
    roundNumbers();
    updateNumbers();
    updateMineCryptoButton();
    buttonRevealChecker();
}

function roundNumbers() {
    val.money = Math.round((val.money + Number.EPSILON) * 1000) / 1000;
    val.crypto = Math.round((val.crypto + Number.EPSILON) * 100) / 100;
    val.cryptoGainedPerSecond = Math.round((val.cryptoGainedPerSecond + Number.EPSILON) * 100) / 100;
    val.upgradeCryptoPerClickCost = Math.round((val.upgradeCryptoPerClickCost + Number.EPSILON) * 100) / 100;
    val.cryptoPerClick = Math.round((val.cryptoPerClick + Number.EPSILON) * 100) / 100;
    val.upgradeIdleCost = Math.round((val.upgradeIdleCost + Number.EPSILON) * 100) / 100;
    val.autoMinerGainPerSecond = Math.round((val.autoMinerGainPerSecond + Number.EPSILON) * 100) / 100;
}

function updateNumbers() {
    document.getElementById("crypto").innerHTML = "Crypto: " + val.crypto;
    document.getElementById("upgradeButton").innerHTML = "Upgrade Button<br>+0.2 Crypto per click<br>Costs: $" + val.upgradeCryptoPerClickCost;
    document.getElementById("cryptoPerSecond").innerHTML = "Crypto per second: " + val.cryptoGainedPerSecond;
    document.getElementById("cryptoPerClick").innerHTML = "Crypto per click: " + val.cryptoPerClick;
    document.getElementById("autoMinerBuyButton").innerHTML = "Auto Miner<br>+" +  val.autoMinerGainPerSecond + " Crypto gained per second<br>Costs: $" + val.upgradeIdleCost;
    document.getElementById("money").innerHTML = "Money: $" + val.money;
    document.getElementById("autoMinerBoostTimer").innerHTML = "Seconds until Auto Miner Boost: " + val.secondsUntilAutoMinerBoost;
}

function updateMineCryptoButton() {
    if (val.buttonClickDelay > 0) {
        document.getElementById("mineCryptoButton").innerHTML = val.buttonClickDelay;
    } else {
        document.getElementById("mineCryptoButton").innerHTML = "Mine Crypto";
    }
}

function buttonRevealChecker() {
    if (val.autoMinerUpgradeBought == 0) {
        if (val.money >= .30) {
            document.getElementById("autoMinerUpgradeButton").hidden = false;   
        } 
    } else {
        document.getElementById("autoMinerUpgradeButton").hidden = true; 
    }

    if (val.money >= 1) {
        document.getElementById("autoMinerBoosterBuyButton").hidden = false;
    }

    if (val.money >= 0.01) {
        document.getElementById("money").hidden = false;
    }

    if (val.autoMiners >= 1) {
        document.getElementById("cryptoPerSecond").hidden = false;
    }

    if (val.money >= 0.05) {
        document.getElementById("autoMinerBuyButton").hidden = false;
        document.getElementById("shopHeader").hidden = false;
    }

    if (val.cryptoPerClick >= 1.2) {
        document.getElementById("cryptoPerClick").hidden = false;
    }

    if (val.money >= 0.06) {
        document.getElementById("upgradeButton").hidden = false;
    }

    if (val.crypto >= 1) {
        document.getElementById("sellCryptoButton").hidden = false;
    }
    
    if (val.crypto >= 1) {
        document.getElementById("crypto").hidden = false;
    }
}

function cheat() {
    var cheatInfo = parseInt(document.getElementById("cheatTextBox").value, 10);
    if (document.getElementById("currencySelector").value == "crypto") {
        if (Number.isFinite(cheatInfo) == true) {
            val.crypto = val.crypto + cheatInfo;
            document.getElementById("cheatTextBox").value = "";
            tickUpdate();
        } else {
            alert("Input needs to be a number");
        }
    } else {
        if (Number.isFinite(cheatInfo) == true) {
            val.money = val.money + cheatInfo;
            document.getElementById("cheatTextBox").value = "";
            tickUpdate();
        } else {
            alert("Input needs to be a number");
        }
    }
}

function addCrypto() {
    if (val.buttonClickDelay <= 0) {
        val.crypto = val.crypto + val.cryptoPerClick;
        val.buttonClickDelay = 10;
        tickUpdate();
    }
}

function buyButtonUpgrade() {
    if (val.money >= val.upgradeCryptoPerClickCost) {
        val.money = val.money - val.upgradeCryptoPerClickCost;
        val.cryptoPerClick = val.cryptoPerClick + .2;
        val.upgradeCryptoPerClickCost = val.upgradeCryptoPerClickCost * 1.2;
        tickUpdate();
    } else {
        alert("Not enough money");
    }
}

function buyAutoMiner() {
    if (val.money >= val.upgradeIdleCost) {
        val.money = val.money - val.upgradeIdleCost;
        val.upgradeIdleCost = val.upgradeIdleCost * 1.5;
        val.autoMiners = val.autoMiners + 1;
        idleGainPerSecondCalc();
        tickUpdate();
    } else {
        alert("Not enough money");
    }
}

function sellCrypto() {
    val.money = val.money + (val.crypto * .01);
    val.crypto = val.crypto - val.crypto;
    tickUpdate();
}

function buyAutoMinerBooster() {
    if (val.money >= 1) {
        val.money = val.money - 1;
        val.autoMinerBoost = val.autoMinerBoost + .1;
        if (val.autoMinerBoosterFirstBuy == 0) {
            val.secondsUntilAutoMinerBoost = 60;
            val.autoMinerBoosterFirstBuy = 1;
        }
        document.getElementById("autoMinerBoostTimer").hidden = false;
        tickUpdate();
    } else {
        alert("Not enough money");
    }
}

function buyAutoMinerUpgrade() {
    if (val.autoMinerUpgradeBought == 0) {
        if (val.money >= .30 ) {
            val.money = val.money - .30;
            val.autoMinerGainPerSecond = val.autoMinerGainPerSecond + .1;
            val.autoMinerUpgradeBought = 1;
            idleGainPerSecondCalc();
            tickUpdate();
        } else {
            alert("Not enough money");
        }
    } else {
        alert("Upgrade already bought");
    }
}