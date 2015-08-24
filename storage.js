var defaultChainItemName = "0";

(function ensureDefaultChainHasValue() {
  var defaultChain = {
    "nodes":  [
      {"type": "Ресурс", "id": "1", "parent": null, "name": "Поле"},
      
      {"id": "pm", "parent": null, "type": "Производственный процесс", "name": "Производство муки"},
      {"id": "2", "parent": "pm", "type": "Транспорт", "name": "Трактор"},
      {"id": "3", "parent": "pm", "type": "Исполнитель", "name": "Тракторист"},
      {"id": "4", "parent": "pm", "type": "Энергоноситель", "name": "Дизель"},
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
    return fixChain(chain);
}

function copyDefaultChainToStorage(value)
{
    localStorage.setItem(defaultChainItemName, JSON.stringify(value));
}

function fixChain(chain)
{
  if(_.isObject(chain))
  {
    if (_.isArray(chain.nodes))
    {
      chain.nodes = _.filter(chain.nodes, function(node) { return _.isObject(node); });
      
      var max = _.max(chain.nodes, function(node) { return _.isNumber(node.id) && !isNaN(node.id) ? node.id : 0; });
      var maxId = max.id;
      
      if(!maxId || maxId < 0)
        maxId = 0;
      
      for (var i = chain.nodes.length - 1; i >= 0; i--) {
        var node = chain.nodes[i];
        
        if(!_.isObject(node)) continue;
        
        // Устанавливаем значения "по умолчанию" или "заглушки" на случай отсутствия их в структуре данных для каждого элемента
        if(!_.isNumber(node.id) && !_.isString(node.id)) node.id = ++maxId;
        if(!_.isNumber(node.parent) && !_.isString(node.parent) && node.parent !== null) node.parent = null;
        if(!_.isString(node.name)) node.name = "" + node.id;
        if(!_.isString(node.type)) node.type = node.name;
      }
    }
    else
    {
      chain.nodes = new Array();
    }
    
    if (_.isArray(chain.links)) // Если у нас есть свойство/аттрибут links + проверим сразу, является ли links массивом/последовательностью.
    {
      // TODO: Подумать, есть ли более простой способ сделать поле необязательным для редактора - 
      // ответ на этот вопрос такой - нужно чтобы перед тем как приступать к дальнейшим изменениям редактор запросил текущее состояние объекта,
      // но чтобы его запросить нужно будет выполнить этот код, а значит к объекту применятся исправления (также такое поведение будет полезно тогда,
      // когда сама визуализация начнёт пополняться функциями редактирования)
      
      var firstNode = _.find(chain.nodes, function(node){ return _.isObject(node); });
      
      for (var i = chain.links.length - 1; i >= 0; i--)
      {
        var link = chain.links[i];
        
        if(!_.isObject(link)) continue;
        
        // Устанавливаем значения "по умолчанию" или "заглушки" на случай отсутствия их в структуре данных для каждой связи
        if(!_.isNumber(link.source)) link.source = firstNode ? firstNode.id : 0;
        if(!_.isNumber(link.target)) link.target = firstNode ? firstNode.id : 0;
        if(!_.isNumber(link.value)) link.value = 1;
      }
    }
    else // Иначе. Т.е. если у нас нет свойства/аттрибута links
    {
      chain.links = new Array(); // Надеюсь, что пустого массива будет достаточно, это мы чуточку позже проверим.
    }
    
    //return JSON.parse(JSON.stringify(chain)); // Для защиты от повреждений данных, желательно сделать копию.
  }
  
  return chain;
}