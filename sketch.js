let objects = [];
let images = {};
let clickers = [];
let ingredients = [];
let drawings = [];
let goodies = [];

let i = 0;
let reset = false;
let spatula;
let button;
let newbg;
let oldbg;
let food = false;

let book;
let recipe;
let lock = [];
let locked = [];
let unlock = [];
let unlocked = [];

//arrays to make sure drawings never overlap on the blackboard
let cordinatesx = [
  820,
  930,
  820,
  930,
  820,
  930,
  820,
  930
];
let cordinatesy = [
  125.5,
  125.5,
  205.5,
  205.5,
  285.5,
  285.5,
  365.5,
  365.5
];

//checking the items to fulfill recipes
let blueberries = false;
let butter = false;
let cherries = false;
let chocochips = false;
let cocoa = false;
let eggs = false;
let fish = false;
let flour = false;
let flower = false;
let icing = false;
let jam = false;
let milk = false;
let sprinkles = false;
let sugar = false;


//checking whether an item was made yet or not, deciding if you get the NEW background
let cakepop = false;
let cupcake = false;
let donut = false;
let muffin = false;
let oreos = false;
let catnip = false;
let cracker = false;
let nothing = false;


function preload() {
  //setup items
  images["background"] = loadImage('./images/Background.png');
  images["bowl"] = loadImage('./images/Bowl.png');
  images["table"] = loadImage('./images/Table.png');
  images["fridgetop"] = loadImage('./images/TopFridgeC.png');
  images["fridgebot"] = loadImage('./images/BotFridgeC.png');
  images["picture"] = loadImage('./images/Picture.png');
  images["blackboard"] = loadImage('./images/Blackboard.png');
  images["spatula"] = loadImage('./images/Spatula.png')
  images["button"] = loadImage('./images/Button.png');
  images["news"] = loadImage('./images/New.png');
  images["old"] = loadImage('./images/Old.png');

  //ingredients
  images["blueberries"] = loadImage('./ingredients/Blueberries.png');
  images["butter"] = loadImage('./ingredients/Butter.png');
  images["cherries"] = loadImage('./ingredients/Cherries.png');
  images["chocochips"] = loadImage('./ingredients/ChocolateChips.png');
  images["cocoa"] = loadImage('./ingredients/CocoaPowder.png');
  images["eggs"] = loadImage('./ingredients/Eggs.png');
  images["fish"] = loadImage('./ingredients/Fish.png');
  images["flour"] = loadImage('./ingredients/Flour.png');
  images["flower"] = loadImage('./ingredients/Flower.png');
  images["icing"] = loadImage('./ingredients/Icing.png');
  images["jam"] = loadImage('./ingredients/Jam.png');
  images["milk"] = loadImage('./ingredients/Milk.png');
  images["sprinkles"] = loadImage('./ingredients/Sprinkles.png');
  images["sugar"] = loadImage('./ingredients/Sugar.png');

  //drawings
  images["blueberriesD"] = loadImage('./drawings/blueberries.png');
  images["butterD"] = loadImage('./drawings/butter.png');
  images["cherriesD"] = loadImage('./drawings/cherries.png');
  images["chocochipsD"] = loadImage('./drawings/choco.png');
  images["cocoaD"] = loadImage('./drawings/cocoa.png');
  images["eggsD"] = loadImage('./drawings/eggs.png');
  images["fishD"] = loadImage('./drawings/fish.png');
  images["flourD"] = loadImage('./drawings/flour.png');
  images["flowerD"] = loadImage('./drawings/flower.png');
  images["icingD"] = loadImage('./drawings/icing.png');
  images["jamD"] = loadImage('./drawings/jam.png');
  images["milkD"] = loadImage('./drawings/milk.png');
  images["sprinklesD"] = loadImage('./drawings/sprinkles.png');
  images["sugarD"] = loadImage('./drawings/sugar.png');

  //goodies 
  images["Cakepop"] = loadImage('./goodies/Cakepop.png');
  images["Cupcake"] = loadImage('./goodies/Cupcake.png');
  images["Donut"] = loadImage('./goodies/Donut.png');
  images["Muffin"] = loadImage('./goodies/Muffin.png');
  images["Oreo"] = loadImage('./goodies/Oreo.png');
  images["Nothing"] = loadImage('./goodies/Nothing.png');
  images["Cracker"] = loadImage('./goodies/Cracker.png');
  images["Catnip"] = loadImage('./goodies/Catnip.png');

  //book
  images["Book"] = loadImage('./recimg/Book.png');
  images["Recipe"] = loadImage('./recimg/Recipe.png');
  images["Lock"] = loadImage('./recimg/Unknown.png');

  images["LockedCakepop"] = loadImage('./recimg/LockedCakepop.png');
  images["LockedCupcake"] = loadImage('./recimg/LockedCupcake.png');
  images["LockedDonut"] = loadImage('./recimg/LockedDonut.png');
  images["LockedMuffin"] = loadImage('./recimg/LockedMuffin.png');
  images["LockedOreo"] = loadImage('./recimg/LockedOreo.png');

  images["UnlockedCakepop"] = loadImage('./recimg/UnlockedCakepop.png');
  images["UnlockedCupcake"] = loadImage('./recimg/UnlockedCupcake.png');
  images["UnlockedDonut"] = loadImage('./recimg/UnlockedDonut.png');
  images["UnlockedMuffin"] = loadImage('./recimg/UnlockedMuffin.png');
  images["UnlockedOreo"] = loadImage('./recimg/UnlockedOreo.png');
}

function setup() {
  createCanvas(1920, 911);
  imageMode(CENTER);
  rectMode(CENTER);

  //setup items
  objects.push(new Table(width / 2, height - 115, 1920, 340, images["table"]));
  objects.push(new Bowl(width / 2, height - 200, 600, 350, images["bowl"]));
  objects.push(new Blackboard(width / 2 - 80, height / 2 - 200, 280, 420, images["blackboard"]));
  objects.push(new Picture(width / 2 + 200, height / 2 - 250, 175, 190, images["picture"]));

  clickers.push(new FridgeTop(width / 2 + 623, height / 2 - 229, 400, 250, images["fridgetop"]));
  clickers.push(new FridgeBot(width / 2 + 623, height / 2 + 68, 400, 360, images["fridgebot"]));
  spatula = new Spatula(width / 2 + 600, height - 150, 250, 250, images["spatula"]);
  button = new Button(width / 2, height / 2 - 330, 100, 100, images["button"]);
  news = new News(width / 2, height / 2, 1000, 900, images["news"]);
  old = new Old(width / 2, height / 2, 1000, 900, images["old"]);

  //ingredients
  ingredients.push(new Blueberries(width / 2 - 830, height / 2 - 235, 170, 100, images["blueberries"]));
  ingredients.push(new Butter(width / 2 + 550, height / 2 - 20, 170, 100, images["butter"]));
  ingredients.push(new Cherries(width / 2 - 630, height / 2 - 250, 200, 145, images["cherries"]));
  ingredients.push(new Chocochips(width / 2 + 550, height / 2 - 240, 120, 180, images["chocochips"]));
  ingredients.push(new Cocoapowder(width / 2 - 835, height / 2 - 70, 130, 130, images["cocoa"]));
  ingredients.push(new Eggs(width / 2 + 720, height / 2 - 25, 110, 120, images["eggs"]));
  ingredients.push(new Fish(width / 2 - 750, height / 2 + 90, 150, 140, images["fish"]));
  ingredients.push(new Flour(width / 2 - 450, height / 2 - 250, 150, 140, images["flour"]));
  ingredients.push(new Flower(width / 2 - 500, height / 2 + 80, 150, 140, images["flower"]));
  ingredients.push(new Icing(width / 2 + 710, height / 2 - 190, 150, 80, images["icing"]));
  ingredients.push(new Jam(width / 2 + 700, height / 2 + 110, 70, 95, images["jam"]));
  ingredients.push(new Milk(width / 2 + 550, height / 2 + 100, 70, 120, images["milk"]));
  ingredients.push(new Sprinkles(width / 2 - 450, height / 2 - 65, 50, 80, images["sprinkles"]));
  ingredients.push(new Sugar(width / 2 - 620, height / 2 - 76, 130, 130, images["sugar"]));

  //goodies
  goodies.push(new Cakepop(width / 2, height / 2, 430, 430, images["Cakepop"]));
  goodies.push(new Cupcake(width / 2, height / 2, 430, 430, images["Cupcake"]));
  goodies.push(new Donut(width / 2, height / 2, 550, 430, images["Donut"]));
  goodies.push(new Muffin(width / 2, height / 2, 430, 530, images["Muffin"]));
  goodies.push(new Oreo(width / 2, height / 2, 500, 430, images["Oreo"]));
  goodies.push(new Cracker(width / 2, height / 2, 600, 430, images["Cracker"]));
  goodies.push(new Catnip(width / 2, height / 2, 430, 430, images["Catnip"]));
  goodies.push(new Nothing(width / 2, height / 2, 600, 430, images["Nothing"]));

  //book
  book = new Book(width / 2 - 600, height / 2 + 300, 400, 200, images["Book"]);
  recipe = new Recipe(width / 2, height / 2, 1500, 900, images["Recipe"]);

  lock.push(new LockCakepop(width / 2 - 520, height / 2 - 250, 200, 200, images["Lock"]));
  lock.push(new LockCupcake(width / 2 - 220, height / 2 - 250, 200, 200, images["Lock"]));
  lock.push(new LockDonut(width / 2 - 520, height / 2, 200, 200, images["Lock"]));
  lock.push(new LockMuffin(width / 2 - 220, height / 2, 200, 200, images["Lock"]));
  lock.push(new LockOreo(width / 2 - 370, height / 2 + 250, 200, 200, images["Lock"]));

  locked.push(new LockedCakepop(width / 2 + 350, height / 2, 450, 700, images["LockedCakepop"]));
  locked.push(new LockedCupcake(width / 2 + 350, height / 2, 500, 700, images["LockedCupcake"]));
  locked.push(new LockedDonut(width / 2 + 350, height / 2, 500, 700, images["LockedDonut"]));
  locked.push(new LockedMuffin(width / 2 + 350, height / 2, 500, 700, images["LockedMuffin"]));
  locked.push(new LockedOreo(width / 2 + 350, height / 2, 500, 700, images["LockedOreo"]));

  unlock.push(new LockCakepop(width / 2 - 520, height / 2 - 250, 200, 200, images["Cakepop"]));
  unlock.push(new LockCupcake(width / 2 - 220, height / 2 - 250, 200, 200, images["Cupcake"]));
  unlock.push(new LockDonut(width / 2 - 520, height / 2, 200, 200, images["Donut"]));
  unlock.push(new LockMuffin(width / 2 - 220, height / 2, 200, 200, images["Muffin"]));
  unlock.push(new LockOreo(width / 2 - 370, height / 2 + 250, 200, 200, images["Oreo"]));

  unlocked.push(new LockedCakepop(width / 2 + 350, height / 2, 450, 700, images["UnlockedCakepop"]));
  unlocked.push(new LockedCupcake(width / 2 + 350, height / 2, 500, 700, images["UnlockedCupcake"]));
  unlocked.push(new LockedDonut(width / 2 + 350, height / 2, 500, 700, images["UnlockedDonut"]));
  unlocked.push(new LockedMuffin(width / 2 + 350, height / 2, 500, 700, images["UnlockedMuffin"]));
  unlocked.push(new LockedOreo(width / 2 + 350, height / 2, 500, 700, images["UnlockedOreo"]));
}

function draw() {
  background(0);
  image(images["background"], width / 2, height / 2, width, height);

  //ingredients
  for (let j = 0; j < ingredients.length; j++) {
    ingredients[j].draw();
  }

  //setup items
  for (let i = 0; i < clickers.length; i++) {
    clickers[i].draw();
  }

  //objects
  for (let i = 0; i < objects.length; i++) {
    objects[i].draw();
  }

  //drawings
  for (let i = 0; i < drawings.length; i++) {
    drawings[i].draw();
  }

  //backgrounds
  news.draw();
  old.draw();

  //goodies
  for (let i = 0; i < goodies.length; i++) {
    goodies[i].draw();
  }

  spatula.draw();

  //book
  book.draw();
  recipe.draw();
  for (let i = 0; i < lock.length; i++) {
    lock[i].draw();
  }
  for (let i = 0; i < locked.length; i++) {
    locked[i].draw();
  }
  for (let i = 0; i < unlock.length; i++) {
    unlock[i].draw();
  }
  for (let i = 0; i < unlocked.length; i++) {
    unlocked[i].draw();
  }

  //other setups
  button.draw();
}

function mouseClicked(event) {
  //opening fridge doors
  for (let i = 0; i < clickers.length; i++) {
    if (mouseY < 650) {
      if (!button.visible) {
        if (clickers[i].collide(mouseX, mouseY)) {
          clickers.splice(i, 1);
          reset = true;
          return;
        }
      }
    }
  }

  //exit button when goods are created or when book is opened
  if (button.collide(mouseX, mouseY)) {
    button.visible = false;
    for (let i = 0; i < goodies.length; i++) {
      goodies[i].visible = false;
    }

    blueberries = false;
    butter = false;
    cherries = false;
    chocochips = false;
    cocoa = false;
    eggs = false;
    fish = false;
    flour = false;
    flower = false;
    icing = false;
    jam = false;
    milk = false;
    sprinkles = false;
    sugar = false;

    news.visible = false;
    old.visible = false;
    food = false;

    book.visible = true;
    recipe.visible = false;

    for (let i = 0; i < lock.length; i++) {
      lock[i].visible = false;
    }

    for (let i = 0; i < locked.length; i++) {
      locked[i].visible = false;
    }

    for (let i = 0; i < unlock.length; i++) {
      unlock[i].visible = false;
    }

    for (let i = 0; i < unlocked.length; i++) {
      unlocked[i].visible = false;
    }
  }

  //spatula that resets the setup of the game
  if (!button.visible) {
    if (spatula.collide(mouseX, mouseY)) {
      reset = false;

      clickers.splice(0, 2);
      if (clickers[0] == undefined) {
        clickers.push(new FridgeTop(width / 2 + 623, height / 2 - 229, 400, 250, images["fridgetop"]));
        clickers.push(new FridgeBot(width / 2 + 623, height / 2 + 68, 400, 360, images["fridgebot"]));
      }


      //cakepop
      if (eggs && butter && flour && milk && sugar && sprinkles && !blueberries && !chocochips && !icing && !cherries && !cocoa && !jam && !fish && !flower) {
        goodies[0].visible = true;
        button.visible = true;
        if (!cakepop) {
          cakepop = true;
          news.visible = true;
        } else if (cakepop && !news.visible) {
          old.visible = true;
        }
        food = true;
      }
      //cupcake
      if (eggs && butter && flour && milk && sugar && blueberries && chocochips && !icing && !cherries && !cocoa && !jam && !sprinkles && !fish && !flower) {
        goodies[1].visible = true;
        button.visible = true;
        if (!cupcake) {
          cupcake = true;
          news.visible = true;
        } else if (cupcake && !news.visible) {
          old.visible = true;
        }
        food = true;
      }
      //donut
      if (eggs && butter && flour && milk && sugar && sprinkles && icing && jam && !blueberries && !chocochips && !cherries && !cocoa && !fish && !flower) {
        goodies[2].visible = true;
        button.visible = true;
        if (!donut) {
          donut = true;
          news.visible = true;
        } else if (donut && !news.visible) {
          old.visible = true;
        }
        food = true;
      }
      //muffin
      if (eggs && butter && flour && milk && sugar && icing && cherry && sprinkles && !blueberries && !chocochips && !cocoa && !jam && !fish && !flower) {
        goodies[3].visible = true;
        button.visible = true;
        if (!muffin) {
          muffin = true;
          news.visible = true;
        } else if (muffin && !news.visible) {
          old.visible = true;
        }
        food = true;
      }
      //oreo
      if (eggs && butter && flour && milk && sugar && cocoa && icing && !blueberries && !chocochips && !sprinkles && !cherries && !jam && !fish && !flower) {
        goodies[4].visible = true;
        button.visible = true;
        if (!oreos) {
          oreos = true;
          news.visible = true;
        } else if (oreo && !news.visible) {
          old.visible = true;
        }
        food = true;
      }
      //cracker
      if (fish && !blueberries && !butter && !cherries && !chocochips && !cocoa && !eggs && !flour && !flower && !icing && !jam && !milk && !sprinkles && !sugar) {
        goodies[5].visible = true;
        button.visible = true;
        if (!cracker) {
          cracker = true;
          news.visible = true;
        } else if (cracker && !news.visible) {
          old.visible = true;
        }
        food = true;
        console.log(cracker);
      }
      //catnip
      if (flower && !blueberries && !butter && !cherries && !chocochips && !cocoa && !eggs && !fish && !flour && !icing && !jam && !milk && !sprinkles && !sugar) {
        goodies[6].visible = true;
        button.visible = true;
        if (!catnip) {
          catnip = true;
          news.visible = true;
        } else if (catnip && !news.visible) {
          old.visible = true;
        }
        food = true;
      }
      //when nothing is selected
      if (!blueberries && !butter && !cherries && !chocochips && !cocoa && !eggs && !fish && !flour && !flower && !icing && !jam && !milk && !sprinkles && !sugar) {
      }
      //nothing
      else if (food == false) {
        goodies[7].visible = true;
        if (!nothing) {
          nothing = true;
          news.visible = true;
        } else if (nothing && !news.visible) {
          old.visible = true;
        }
        button.visible = true;
      }
    }
  }

  //the functionality of the ingredients
  for (let j = 0; j < ingredients.length; j++) {
    let x = cordinatesx[i];
    let y = cordinatesy[i];
    if (spatula.collide(mouseX, mouseY)) {
      reset = false;
      ingredients[j].visible = true;
      drawings.splice(0, 10);
      i = 0;
    }

    if (!button.visible) {
      if (ingredients[j].visible) {
        if (ingredients[j].collide(mouseX, mouseY)) {
          if (i <= 7) {
            ingredients[j].visible = false;
          }
          switch (j) {
            case 0:
              blueberries = true;
              drawings.push(new BlueberriesD(x, y, 100, 100, images["blueberriesD"]));
              i++;
              break;
            case 1:
              butter = true;
              drawings.push(new ButterD(x, y, 100, 100, images["butterD"]));
              i++;
              break;
            case 2:
              cherries = true;
              drawings.push(new CherriesD(x, y, 100, 100, images["cherriesD"]));
              i++;
              break;
            case 3:
              chocochips = true;
              drawings.push(new ChocochipsD(x, y, 100, 100, images["chocochipsD"]));
              i++;
              break;
            case 4:
              cocoa = true;
              drawings.push(new CocoaPowderD(x, y, 100, 100, images["cocoaD"]));
              i++;
              break;
            case 5:
              eggs = true;
              drawings.push(new EggsD(x, y, 100, 100, images["eggsD"]));
              i++;
              break;
            case 6:
              fish = true;
              drawings.push(new FishD(x, y, 100, 100, images["fishD"]));
              i++;
              break;
            case 7:
              flour = true;
              drawings.push(new FlourD(x, y, 100, 100, images["flourD"]));
              i++;
              break;
            case 8:
              flower = true;
              drawings.push(new FlowerD(x, y, 100, 100, images["flowerD"]));
              i++;
              break;
            case 9:
              icing = true;
              drawings.push(new IcingD(x, y, 100, 100, images["icingD"]));
              i++;
              break;
            case 10:
              jam = true;
              drawings.push(new JamD(x, y, 100, 100, images["jamD"]));
              i++;
              break;
            case 11:
              milk = true;
              drawings.push(new MilkD(x, y, 100, 100, images["milkD"]));
              i++;
              break;
            case 12:
              sprinkles = true;
              drawings.push(new SprinklesD(x, y, 100, 100, images["sprinklesD"]));
              i++;
              break;
            case 13:
              sugar = true;
              drawings.push(new SugarD(x, y, 100, 100, images["sugarD"]));
              i++;
              break;
          }
        }
      }
    }
  }
  if (book.collide(mouseX, mouseY)) {
    book.visible = false;
    button.visible = true;
    recipe.visible = true;

    if (!cakepop) {
      lock[0].visible = true;
    }
    if (!cupcake) {
      lock[1].visible = true;
    }
    if (!donut) {
      lock[2].visible = true;
    }
    if (!muffin) {
      lock[3].visible = true;
    }
    if (!oreos) {
      lock[4].visible = true;
    }

    if (cakepop) {
      unlock[0].visible = true;
    }
    if (cupcake) {
      unlock[1].visible = true;
    }
    if (donut) {
      unlock[2].visible = true;
    }
    if (muffin) {
      unlock[3].visible = true;
    }
    if (oreos) {
      unlock[4].visible = true;
    }
  }

  for (let i = 0; i < lock.length; i++) {
    if (lock[i].visible) {
      if (lock[i].collide(mouseX, mouseY)) {
        switch (i) {
          case 0:
            locked[0].visible = true;
            locked[1].visible = false;
            locked[2].visible = false;
            locked[3].visible = false;
            locked[4].visible = false;

            unlocked[0].visible = false;
            unlocked[1].visible = false;
            unlocked[2].visible = false;
            unlocked[3].visible = false;
            unlocked[4].visible = false;
            break;
          case 1:
            locked[0].visible = false;
            locked[1].visible = true;
            locked[2].visible = false;
            locked[3].visible = false;
            locked[4].visible = false;
            
            unlocked[0].visible = false;
            unlocked[1].visible = false;
            unlocked[2].visible = false;
            unlocked[3].visible = false;
            unlocked[4].visible = false;
            break;
          case 2:
            locked[0].visible = false;
            locked[1].visible = false;
            locked[2].visible = true;
            locked[3].visible = false;
            locked[4].visible = false;
            
            unlocked[0].visible = false;
            unlocked[1].visible = false;
            unlocked[2].visible = false;
            unlocked[3].visible = false;
            unlocked[4].visible = false;
            break;
          case 3:
            locked[0].visible = false;
            locked[1].visible = false;
            locked[2].visible = false;
            locked[3].visible = true;
            locked[4].visible = false;
            
            unlocked[0].visible = false;
            unlocked[1].visible = false;
            unlocked[2].visible = false;
            unlocked[3].visible = false;
            unlocked[4].visible = false;
            break;
          case 4:
            locked[0].visible = false;
            locked[1].visible = false;
            locked[2].visible = false;
            locked[3].visible = false;
            locked[4].visible = true;
            
            unlocked[0].visible = false;
            unlocked[1].visible = false;
            unlocked[2].visible = false;
            unlocked[3].visible = false;
            unlocked[4].visible = false;
            break;
        }
      }
    }
  }

  for (let i = 0; i < unlock.length; i++) {
    if (unlock[i].visible) {
      if (unlock[i].collide(mouseX, mouseY)) {
        switch (i) {
          case 0:
            unlocked[0].visible = true;
            unlocked[1].visible = false;
            unlocked[2].visible = false;
            unlocked[3].visible = false;
            unlocked[4].visible = false;
            
            locked[0].visible = false;
            locked[1].visible = false;
            locked[2].visible = false;
            locked[3].visible = false;
            locked[4].visible = false;
            break;
          case 1:
            unlocked[0].visible = false;
            unlocked[1].visible = true;
            unlocked[2].visible = false;
            unlocked[3].visible = false;
            unlocked[4].visible = false;
            
            locked[0].visible = false;
            locked[1].visible = false;
            locked[2].visible = false;
            locked[3].visible = false;
            locked[4].visible = false;
            break;
          case 2:
            unlocked[0].visible = false;
            unlocked[1].visible = false;
            unlocked[2].visible = true;
            unlocked[3].visible = false;
            unlocked[4].visible = false;
            
            locked[0].visible = false;
            locked[1].visible = false;
            locked[2].visible = false;
            locked[3].visible = false;
            locked[4].visible = false;
            break;
          case 3:
            unlocked[0].visible = false;
            unlocked[1].visible = false;
            unlocked[2].visible = false;
            unlocked[3].visible = true;
            unlocked[4].visible = false;
            
            locked[0].visible = false;
            locked[1].visible = false;
            locked[2].visible = false;
            locked[3].visible = false;
            locked[4].visible = false;
            break;
          case 4:
            unlocked[0].visible = false;
            unlocked[1].visible = false;
            unlocked[2].visible = false;
            unlocked[3].visible = false;
            unlocked[4].visible = true;
            
            locked[0].visible = false;
            locked[1].visible = false;
            locked[2].visible = false;
            locked[3].visible = false;
            locked[4].visible = false;
            break;
        }
      }
    }
  }
}
