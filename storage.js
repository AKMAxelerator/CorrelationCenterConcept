var defaultChainItemName = "0";

(function ensureDefaultChainHasValue() {
  var defaultChain = {
    "nodes":  [
      {"type": "Ресурс", "id": "1", "parent": null, "name": "Поле"},
      
      {"id": "pm", "parent": null, "type": "Производственный процесс", "name": "Производство муки"},
      {"id": "2", "parent": "pm", "type": "Транспорт", "name": "Трактор"},
      {"id": "3", "parent": "pm", "type": "Исполнитель", "name": "Тракторист"},
      {"id": "4", "parent": "pm", "type": "Энергоноситель", "name": "Дизиль"},
      {"id": "5", "parent": "pm", "type": "Строение", "name": "Мельница"},
      {"id": "6", "parent": "pm", "type": "Исполнитель", "name": "Мельник"},
      
      {"type": "Ресурс", "id": "7", "parent": null, "name": "Мука"}
    ],
    
    "links":  [
      {"source": 1, "target": 3},
      {"source": 3, "target": 2},
      {"source": 4, "target": 2},
      {"source": 6, "target": 5},
      {"source": 2, "target": 5},
      {"source": 1, "target": 2},
      {"source": 5, "target": 7}
    ]
  }
  
  var defaultChainString = localStorage.getItem(defaultChainItemName);
  
  var resetDefaultChainStorageItem = false;
  if(!defaultChainString) resetDefaultChainStorageItem = true;
  else {
    try { 
      var parsed = JSON.parse(defaultChainString);
      if(_.isEmpty(parsed)) resetDefaultChainStorageItem = true;
    } catch(e) {
      resetDefaultChainStorageItem = true;
    }
  }
  
  if(resetDefaultChainStorageItem) {
    defaultChainString = JSON.stringify(defaultChain);
    localStorage.setItem(defaultChainItemName, defaultChainString);
  }
})();

function copyDefaultChainFromStorage()
{
    var chain = JSON.parse(localStorage.getItem(defaultChainItemName));
    
    // TODO: Подумать, есть ли более простой способ сделать поле необязательным для редактора
    for (var i = chain.links.length - 1; i >= 0; i--)
        if(chain.links[i].value == undefined) chain.links[i].value = 10;
        
    return chain;
}

function copyDefaultChainToChain(value)
{
    localStorage.setItem(defaultChainItemName, JSON.stringify(value));
}