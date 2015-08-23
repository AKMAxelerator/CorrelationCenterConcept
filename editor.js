(function() {

var editor;
var editorJSONToSet = "";

// TODO: Узнать почему нельзя сделать редактор с развёрнутым деревом по умолчанию. Возможно нужно написать автору.

var options = {
  mode: 'tree',
  modes: ['tree', 'form', 'view', 'text', 'code'], // allowed modes ('code' не работает, разобраться, почему)
  error: function (error) { console.dir(error); },
  change: function () {
    try {
      var text = editor.getText();
      var isTextValid = true;
      try {
        if(editor.editor) {
          if(JSON.stringify(JSON.parse(text)) == editorJSONToSet)
            return;
        } else{
          JSON.parse(text);
        }
      } catch (error) { isTextValid = false; }
      
      if (isTextValid)
      {
        json = editor.get();
        json = fixChain(json); // TODO: Попробовать возвращать true в том случае, если реально были применены исправления
        
        var lastCursorPosition;
        if(editor.editor)
        {
          lastCursorPosition = editor.editor.getCursorPosition();
          editorJSONToSet = JSON.stringify(json);
        }
        
        editor.set(json);
        
        if(editor.editor)
          editor.editor.moveCursorTo(lastCursorPosition.row, lastCursorPosition.column);
        
        copyDefaultChainToStorage(json);
        if(editor.expandAll) editor.expandAll();
      }
      
      console.dir();

    } catch(error) {
      console.dir(error);
    }
  }
};

//var leftContainer = document.getElementById('left-json-editor-container');
//var rightContainer = document.getElementById('right-json-editor-container');
var container = $('#json-editor-container');

container.css("background-color", "#FFFFFF");
container.css("width", getSectionWidth());
container.css("height", getSectionHeight());

var json = copyDefaultChainFromStorage();

//var leftEditor = new JSONEditor(leftContainer, options, json);
//var rightEditor = new JSONEditor(rightContainer, options, json);
editor = new JSONEditor(container[0], options, json);
editor.expandAll();

// TODO: Решить проблему с конфликтами названий css классов json editor и bootstrap.

//window.parent.location.reload();

})();