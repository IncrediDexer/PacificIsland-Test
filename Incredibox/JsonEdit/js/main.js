// ============ 全局变量 ============
var message = 50;
document.documentElement.style.setProperty("--message",message + "%");
var Animation = 150;
document.documentElement.style.setProperty("--Animation",Animation + "%");
var reset = 0;
var loopB = 0;

var polo=0,texture=100;
document.documentElement.style.setProperty("--polo",polo+"%");
document.documentElement.style.setProperty("--texture",texture+"%");

var x1,y1,x2,y2;
var currentFrame=1;
var previewFrame=1;
var allList=[];
var deriveJSON_Y=105;
document.documentElement.style.setProperty("--deriveJSON",deriveJSON_Y+"%");

// ============ handIn函数 ============
function handIn(){
    polo_animeName=document.getElementById('polo_animeName');
    if(reset == 0){
        polo_totalFrame=document.getElementById('polo_totalFrame');
        polo_headHeight=document.getElementById('polo_headHeight');
    }
    polo_app_totalframe=document.getElementById('polo_app_totalframe');
    polo_looptime=document.getElementById('polo_looptime');
    preview_polo_texture=document.getElementById('preview_polo_texture');
    if(reset == 0){
        if(polo_totalFrame.value==""){
            alert("The 'TotalFrame' hasn't been filled in yet");
        };
        if(polo_headHeight.value==""){
            alert("The 'HeadHeight' hasn't been filled in yet");
        };
    }
    if(preview_polo_texture.value==""){
        alert("The 'Texture' hasn't been filled in yet");
    };
    if(polo_totalFrame.value!==""&&polo_headHeight.value!==""&&preview_polo_texture.value!==""&&reset==0){
        message=150;
        document.documentElement.style.setProperty("--message",message+"%");
        document.documentElement.style.setProperty("--polo_width",164+"px");
        document.documentElement.style.setProperty("--polo_height",380+"px");
        document.documentElement.style.setProperty("--polo_headHeight",polo_headHeight.value+"px");
        document.documentElement.style.setProperty("--polo_body","-"+164+"px");
        document.documentElement.style.setProperty("--polo_head",380-polo_headHeight.value+"px");
        x1=0;
        y1=380;
        x2=0;
        y2=0;
        document.documentElement.style.setProperty("--x1","-"+x1+"px");
        document.documentElement.style.setProperty("--y1","-"+y1+"px");
        document.documentElement.style.setProperty("--x2",x2+"px");
        document.documentElement.style.setProperty("--y2",y2+"px");
        document.documentElement.style.setProperty("--x1_outline",x1+"px");
        document.documentElement.style.setProperty("--y1_outline",y1+"px");
        currentFrame=1;
        //allList=[];
        for(var i=0;i<polo_totalFrame.value;i++){
            allList.push([Number(x1),Number(y1),Number(x2),Number(y2)]);
        }
        refreshList();
        refreshFrame();
        document.getElementById('reset').innerHTML="";
        document.getElementById('reset_2').innerHTML="";
        reset = 1;
    }
    if(preview_polo_texture.value!==""&&reset==1){
        message=150;
        document.documentElement.style.setProperty("--message",message+"%");
        document.documentElement.style.setProperty("--polo_width",164+"px");
        document.documentElement.style.setProperty("--polo_height",380+"px");
        document.documentElement.style.setProperty("--polo_headHeight",polo_headHeight.value+"px");
        document.documentElement.style.setProperty("--polo_body","-"+164+"px");
        document.documentElement.style.setProperty("--polo_head",380-polo_headHeight.value+"px");
        document.documentElement.style.setProperty("--x1","-"+x1+"px");
        document.documentElement.style.setProperty("--y1","-"+y1+"px");
        document.documentElement.style.setProperty("--x2",x2+"px");
        document.documentElement.style.setProperty("--y2",y2+"px");
        document.documentElement.style.setProperty("--x1_outline",x1+"px");
        document.documentElement.style.setProperty("--y1_outline",y1+"px");
        refreshList();
        refreshFrame();
    };
}

// ============ 模式切换 ============
function choose_polo(){
    polo=0;
    texture=100;
    document.documentElement.style.setProperty("--polo",polo+"%");
    document.documentElement.style.setProperty("--texture",texture+"%");
}
function choose_texture(){
    polo=100;
    texture=0;
    document.documentElement.style.setProperty("--polo",polo+"%");
    document.documentElement.style.setProperty("--texture",texture+"%");
}

// ============ 方向控制 ============
function up(){
    if(polo==0){
        y2--;
        document.documentElement.style.setProperty("--y2",y2+"px");
    }
    else{
        y1-=polo_headHeight.value;
        document.documentElement.style.setProperty("--y1","-"+y1+"px");
        document.documentElement.style.setProperty("--y1_outline",y1+"px");
    }
    refreshList();
}
function left(){
    if(polo==0){
        x2=x2-1;
        document.documentElement.style.setProperty("--x2",x2+"px");
    }
    else{
        x1-=164;
        document.documentElement.style.setProperty("--x1","-"+x1+"px");
        document.documentElement.style.setProperty("--x1_outline",x1+"px");
    }
    refreshList();
}
function down(){
    if(polo==0){
        y2++;
        document.documentElement.style.setProperty("--y2",y2+"px");
    }
    else{
        y1=Number(y1)+Number(polo_headHeight.value);
        document.documentElement.style.setProperty("--y1","-"+y1+"px");
        document.documentElement.style.setProperty("--y1_outline",+y1+"px");
    }
    refreshList();
}
function right(){
    if(polo==0){
        x2++;
        document.documentElement.style.setProperty("--x2",x2+"px");
    }
    else{
        x1=Number(x1)+Number(164);
        document.documentElement.style.setProperty("--x1","-"+x1+"px");
        document.documentElement.style.setProperty("--x1_outline",x1+"px");
    }
    refreshList();
}

// ============ 帧导航 ============
function lastFrame(){
    if(currentFrame>1){
        currentFrame=currentFrame-1;
        refreshFrame();
    }
}
function nextFrame(){
    if(currentFrame<polo_totalFrame.value){
        currentFrame++;
        refreshFrame();
    }
}
function jump() {
    jumpFrame=document.getElementById('jumpFrame');
    if(jumpFrame.value!=="") {
        currentFrame=jumpFrame.value;
        refreshFrame();
    }
}

// ============ 导出功能 ============
function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);
    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    } else {
        pom.click();
    }
}
function copyToClipboard(text) {
    const textArea = document.createElement('textarea')
    textArea.style.position = 'fixed'
    textArea.style.visibility = '-10000px'
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    if (!document.execCommand('copy')) {
        console.warn('复制失败')
        document.body.removeChild(textArea)
        return false
    } else {
        console.log("复制成功")
        document.body.removeChild(textArea)
        return true
    }
}
function downloadJSON(){
    var arrayFrame="";
    for(var i=0;i<polo_totalFrame.value;i++){
        if(i!==polo_totalFrame.value-1){
            l=getList(allList[i][0],allList[i][1],allList[i][2],allList[i][3]);
            arrayFrame=arrayFrame+l+",\n\t\t";
        }
        else{
            l=getList(allList[i][0],allList[i][1],allList[i][2],allList[i][3]);
            arrayFrame=arrayFrame+l;
        }
    }
    fileJSON='{\n\t"animeName":"'+polo_animeName.value+'",\n\t"percentageMax":"'+0.2+'",\n\t"totalFrame":"'+polo_totalFrame.value+'",\n\t"width":"'+164+'",\n\t"height":"'+380+'",\n\t"headHeight":"'+polo_headHeight.value+'",\n\t"arrayFrame":[\n\t\t'+arrayFrame+'\n\t]\n}';
    download(polo_animeName.value+".json",fileJSON);
}
function copyJSON(){
    var arrayFrame="";
    for(var i=0;i<polo_totalFrame.value;i++){
        if(i!==polo_totalFrame.value-1){
            l=getList(allList[i][0],allList[i][1],allList[i][2],allList[i][3]);
            arrayFrame=arrayFrame+l+",\n\t\t";
        }
        else{
            l=getList(allList[i][0],allList[i][1],allList[i][2],allList[i][3]);
            arrayFrame=arrayFrame+l;
        }
    }
    fileJSON='{\n\t"animeName":"'+polo_animeName.value+'",\n\t"percentageMax":"'+0.2+'",\n\t"totalFrame":"'+polo_totalFrame.value+'",\n\t"width":"'+164+'",\n\t"height":"'+380+'",\n\t"headHeight":"'+polo_headHeight.value+'",\n\t"arrayFrame":[\n\t\t'+arrayFrame+'\n\t]\n}';
    copyToClipboard(fileJSON);
}
function deriveJSON(){
    deriveJSON_Y=5;
    document.documentElement.style.setProperty("--deriveJSON",deriveJSON_Y+"%");
}
function deriveJSON_close(){
    deriveJSON_Y=105;
    document.documentElement.style.setProperty("--deriveJSON",deriveJSON_Y+"%");
}
function changeJSON(){
    message=50;
    document.documentElement.style.setProperty("--message",message + "%");
}

// ============ 辅助函数 ============
function getList(a,b,c,d){
    return '{"prop":"'+a+","+b+","+c+","+d+'"}';
}
function getFrame(a,b){
    return a+"/"+b;
}
function refreshList(){
    document.getElementById('csurrentList').innerHTML=getList(x1,y1,x2,y2);
    allList.splice(currentFrame-1,1,[Number(x1),Number(y1),Number(x2),Number(y2)]);
}
function refreshFrame(){
    x1=allList[currentFrame-1][0];
    y1=allList[currentFrame-1][1];
    x2=allList[currentFrame-1][2];
    y2=allList[currentFrame-1][3];
    document.documentElement.style.setProperty("--x1","-"+x1+"px");
    document.documentElement.style.setProperty("--y1","-"+y1+"px");
    document.documentElement.style.setProperty("--x2",x2+"px");
    document.documentElement.style.setProperty("--y2",y2+"px");
    document.documentElement.style.setProperty("--x1_outline",x1+"px");
    document.documentElement.style.setProperty("--y1_outline",y1+"px");
    document.getElementById('csurrentList').innerHTML=getList(x1,y1,x2,y2);
    document.getElementById('currentFrame').innerHTML=getFrame(currentFrame,polo_totalFrame.value);
}
function refreshFrame_preview(){
    x1_preview=allList[previewFrame-1][0];
    y1_preview=allList[previewFrame-1][1];
    x2_preview=allList[previewFrame-1][2];
    y2_preview=allList[previewFrame-1][3];
    document.documentElement.style.setProperty("--x1_preview","-"+x1_preview+"px");
    document.documentElement.style.setProperty("--y1_preview","-"+y1_preview+"px");
    document.documentElement.style.setProperty("--x2_preview",x2_preview+"px");
    document.documentElement.style.setProperty("--y2_preview",y2_preview+"px");
}

// ============ 动画控制 ============
let animationId = null;
let isPlaying = false;
let animationStartTime = 0;
let lastFrameUpdateTime = 0;
let bAudioPlayed = false;

function previewAnimation(){
    if (isPlaying) return;
    
    // 初始化
    Animation = 50;
    document.documentElement.style.setProperty("--Animation", Animation + "%");
    isPlaying = true;
    previewFrame = 1;
    animationStartTime = performance.now();
    lastFrameUpdateTime = animationStartTime;
    bAudioPlayed = false;
    
    // 计算参数
    const totalFrames = Number(polo_totalFrame.value);
    const totalPlayTime = loopB == 1 ? 
        Number(polo_looptime.value) * 2 : 
        Number(polo_looptime.value);
    
    const frameDuration = totalPlayTime / totalFrames;
    const halfWayTime = totalPlayTime / 2; // 音频B触发点

    function animate(currentTime) {
        if (!isPlaying) return;
        
        const elapsed = currentTime - animationStartTime;
        
        if(loopB == 1 && !bAudioPlayed && elapsed >= halfWayTime) {
            playFromStart_b();
            bAudioPlayed = true;
            //console.log(`B音频触发 @ ${elapsed.toFixed(1)}ms`);
        }
        
        const targetFrame = Math.min(
            Math.floor(elapsed / frameDuration) + 1,
            totalFrames
        );
        
        if (targetFrame !== previewFrame) {
            previewFrame = targetFrame;
            refreshFrame_preview();
            lastFrameUpdateTime = currentTime;
            //console.log(`更新到帧: ${previewFrame}/${totalFrames} @ ${elapsed.toFixed(1)}ms`);
        }
        
        if (elapsed < totalPlayTime) {
            animationId = requestAnimationFrame(animate);
        } else {
            stopAnimation();
        }
    }
    
    animationId = requestAnimationFrame(animate);
    playFromStart();
}

function stopAnimation() {
    isPlaying = false;
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    Animation = 150;
    document.documentElement.style.setProperty("--Animation", Animation + "%");
    pauseAudio();
    pauseAudio_b();
}

function previewAnimation_close(){
    stopAnimation();
}

// ============ 导入文件 ============

// 音频变量
let importedAudio = null;
let importedAudio_b = null;

// 从头播放函数
function playFromStart() {
    if (!importedAudio) {
        //alert('请先导入音频文件');
        return;
    }
    
    try {
        // 重置播放位置到开头
        importedAudio.currentTime = 0;
        
        // 开始播放
        importedAudio.play().catch(error => {
            console.error('播放失败:', error);
            //alert('播放失败: ' + error.message);
        });
    } catch (error) {
        console.error('音频操作错误:', error);
        //alert('音频操作出错: ' + error.message);
    }
}

function playFromStart_b() {
    if (!importedAudio_b) {
        //alert('请先导入音频文件');
        return;
    }
    
    try {
        // 重置播放位置到开头
        importedAudio_b.currentTime = 0;
        
        // 开始播放
        importedAudio_b.play().catch(error => {
            console.error('播放失败:', error);
            //alert('播放失败: ' + error.message);
        });
    } catch (error) {
        console.error('音频操作错误:', error);
        //alert('音频操作出错: ' + error.message);
    }
}

// 暂停函数
function pauseAudio() {
    if (importedAudio) {
        importedAudio.pause();
    }
}

function pauseAudio_b() {
    if (importedAudio_b) {
        importedAudio_b.pause();
    }
}

(function() {
    // 存储导入的JSON数据
    let importedJsonData = null;
    
    document.addEventListener('DOMContentLoaded', function() {
        // JSON导入
        const jsonFileInput = document.getElementById('jsonFileInput');
        document.getElementById('importJsonBtn').addEventListener('click', function() {
            jsonFileInput.click();
        });
        
        jsonFileInput.addEventListener('change', handleJsonImport);
        
        // app.js/app.json导入
        const appFileInput = document.getElementById('appFileInput');
        document.getElementById('importAppBtn').addEventListener('click', function() {
            appFileInput.click();
        });
        
        appFileInput.addEventListener('change', handleAppImport);
        
        // 图片上传
        const textureInput = document.getElementById('preview_polo_texture');
        document.getElementById('importTexture').addEventListener('click', function() {
            textureInput.click();
        });
        
        textureInput.addEventListener('change', handleTextureImport);
        
        // 音频上传
        const audioInput = document.getElementById('audioFileInput');
        document.getElementById('importAudioBtn').addEventListener('click', function() {
            audioInput.click();
        });
        
        audioInput.addEventListener('change', handleAudioImport);
        
        const audioInput_b = document.getElementById('audioFileInput_b');
        document.getElementById('importAudioBtn_b').addEventListener('click', function() {
            audioInput_b.click();
        });
        
        audioInput_b.addEventListener('change', handleAudioImport_b);
        
        // 绑定全局函数到按钮
        document.getElementById('playAudioBtn').addEventListener('click', playAudio);
        document.getElementById('pauseAudioBtn').addEventListener('click', pauseAudio);
        document.getElementById('playAudioBtn_b').addEventListener('click', playAudio_b);
        document.getElementById('pauseAudioBtn_b').addEventListener('click', pauseAudio_b);
    });

    // 处理JSON导入
    function handleJsonImport(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        
        reader.onload = function(e) {
            try {
                importedJsonData = JSON.parse(e.target.result);
                console.log('JSON导入成功:', importedJsonData);
                
                document.getElementById('polo_animeName').value = importedJsonData['animeName'];
                document.getElementById('polo_totalFrame').value = importedJsonData['totalFrame'];
                document.getElementById('polo_headHeight').value = importedJsonData['headHeight'];
                allList = convertToArray(importedJsonData);
                
            } catch (error) {
                console.error('JSON解析错误:', error);
                //alert('导入失败：文件不是有效的JSON格式');
            } finally {
                event.target.value = '';
            }
        };
        
        reader.onerror = function() {
            //alert('文件读取失败');
            event.target.value = '';
        };
        
        reader.readAsText(file);
    }

    // 处理app.js/json导入
    function handleAppImport(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        
        reader.onload = function(e) {
            try {
                const content = e.target.result;
                
                if (file.name.endsWith('.js')) {
                    // 解析app.js
                    const looptimeMatch = content.match(/this\.looptime\s*=\s*(\d+)/);
                    if (looptimeMatch && looptimeMatch[1]) {
                        document.getElementById('polo_looptime').value = looptimeMatch[1];
                        console.log('从app.js导入looptime:', looptimeMatch[1]);
                    } else {
                        //alert('未找到this.looptime定义');
                    }
                } else if (file.name.endsWith('.json')) {
                    // 解析app.json
                    const jsonData = JSON.parse(content);
                    if (jsonData.looptime) {
                        document.getElementById('polo_looptime').value = jsonData.looptime;
                        console.log('从app.json导入looptime:', jsonData.looptime);
                    } else {
                        //alert('JSON中未找到looptime字段');
                    }
                }
            } catch (error) {
                console.error('文件解析错误:', error);
                //alert('导入失败：' + error.message);
            } finally {
                event.target.value = '';
            }
        };
        
        reader.onerror = function() {
            //alert('文件读取失败');
            event.target.value = '';
        };
        
        reader.readAsText(file);
    }

    // 图片上传
    function handleTextureImport(event) {
		document.getElementById('message_img').innerHTML='<img id="polo_img1" height="100px"/>';
        const file = event.target.files[0];
        if (!file) return;
        
        if (!file.type.match('image.*')) {
            //alert('请选择图片文件');
            event.target.value = '';
            return;
        }
        
        const reader = new FileReader();
        const preview1 = document.querySelector('#polo_img1');
        const preview2 = document.querySelector('#polo_img2');
        const preview3 = document.querySelector('#polo_img3');
        const preview4 = document.querySelector('#polo_img4');
        const preview5 = document.querySelector('#polo_img5');
        const preview6 = document.querySelector('#polo_img6');
        
        reader.onload = function(e) {
            preview1.src = e.target.result;
            preview2.src = e.target.result;
            preview3.src = e.target.result;
            preview4.src = e.target.result;
            preview5.src = e.target.result;
            preview6.src = e.target.result;
      
            const tempImg = new Image();
            tempImg.onload = function() {
                const newWidth = this.width / 2;
                const newHeight = this.height / 2;
                
                preview2.style.width = newWidth + 'px';
                preview2.style.height = newHeight + 'px';
                preview3.style.width = newWidth + 'px';
                preview3.style.height = newHeight + 'px';
                preview4.style.width = newWidth + 'px';
                preview4.style.height = newHeight + 'px';
                preview5.style.width = newWidth + 'px';
                preview5.style.height = newHeight + 'px';
                preview6.style.width = newWidth + 'px';
                preview6.style.height = newHeight + 'px';
                
                document.documentElement.style.setProperty("--polo_img_width", newWidth + "px");
                document.documentElement.style.setProperty("--polo_img_height", newHeight + "px");
            };
            tempImg.src = e.target.result;
        };
        
        reader.onerror = function() {
            //alert('图片读取失败');
            event.target.value = '';
        };
        
        reader.readAsDataURL(file);
    }

    // 音频导入处理
    function handleAudioImport(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        if (!file.type.match('audio.*')) {
            //alert('请选择音频文件');
            event.target.value = '';
            return;
        }
        
        // 释放之前导入的音频资源
        if (importedAudio) {
            pauseAudio();
            URL.revokeObjectURL(importedAudio.src);
        }
        
        // 创建新的音频对象
        importedAudio = new Audio(URL.createObjectURL(file));
        importedAudio.controls = true;
        
        // 显示音频控件
        const audioContainer = document.getElementById('audioContainer');
        audioContainer.innerHTML = '';
        audioContainer.appendChild(importedAudio);
        
        console.log('音频导入成功:', file.name);
    }
    
    function handleAudioImport_b(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        if (!file.type.match('audio.*')) {
            //alert('请选择音频文件');
            event.target.value = '';
            return;
        }
        
        // 释放之前导入的音频资源
        if (importedAudio_b) {
            pauseAudio_b();
            URL.revokeObjectURL(importedAudio_b.src);
        }
        
        // 创建新的音频对象
        importedAudio_b = new Audio(URL.createObjectURL(file));
        importedAudio_b.controls = true;
        
        // 显示音频控件
        const audioContainer_b = document.getElementById('audioContainer_b');
        audioContainer_b.innerHTML = '';
        audioContainer_b.appendChild(importedAudio_b);
        
        console.log('音频导入成功:', file.name);
    }
})();

// 转换函数
function convertToArray(dictData) {
    return dictData.arrayFrame.map(item => {
        return item.prop.split(',').map(Number);
    });
}

function playFromStart_b() {
    if (!importedAudio_b) return;
    try {
        importedAudio_b.currentTime = 0;
        importedAudio_b.play().catch(error => {
            console.error('B音频播放失败:', error);
        });
    } catch (error) {
        console.error('B音频操作错误:', error);
    }
}

function pauseAudio_b() {
    if (importedAudio_b) importedAudio_b.pause();
}

function handleAudioImport_b(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    try {
        if (!file.type.match('audio.*')) {
            throw new Error('请选择音频文件');
        }
        
        if (importedAudio_b) {
            pauseAudio_b();
            URL.revokeObjectURL(importedAudio_b.src);
        }
        
        importedAudio_b = new Audio(URL.createObjectURL(file));
        importedAudio_b.controls = true;
        
        const audioContainer_b = document.getElementById('audioContainer_b');
        if (audioContainer_b) {
            audioContainer_b.innerHTML = '';
            audioContainer_b.appendChild(importedAudio_b);
        }
    } catch (error) {
        console.error('B音频导入失败:', error);
        //alert(error.message);
        event.target.value = '';
    }
}

// ============ Loop B ============
document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('loopBToggle');
    
    if (toggle) {
        toggle.addEventListener('change', function() {
            if (this.checked) {
                document.getElementById('loopB').innerHTML='<br /><button id="importAudioBtn_b"><span class="btn-icon">🎧</span><span class="btn-text">import sound_b</span></button><input type="file" id="audioFileInput_b" accept="audio/*" style="display: none;"><br /><div id="audioContainer_b"></div>';
                
                // 新增事件绑定
                document.getElementById('importAudioBtn_b').addEventListener('click', function() {
                    document.getElementById('audioFileInput_b').click();
                });
                
                document.getElementById('audioFileInput_b').addEventListener('change', handleAudioImport_b);
                
                loopB = 1;
                document.getElementById('polo_app_totalframe').value = polo_totalFrame.value * 2;
            } else {
                document.getElementById('loopB').innerHTML='';
                loopB = 0;
                document.getElementById('polo_app_totalframe').value = polo_totalFrame.value;
            }
        });
    }
});