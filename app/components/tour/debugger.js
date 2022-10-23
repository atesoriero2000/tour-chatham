

const Cat = () => {
    {showButtons && 
    <View>
        <TouchableOpacity style = {[debuggerStyles.button, {left: 15}]} onPress={() => this.DEBUG_stopAudio()}>
            <Text style={{color: 'whitesmoke'}}>{'X'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {[debuggerStyles.button, {left: 45}]} onPress={() => this.DEBUG_lastTurn()}>
            <Text style={{color: 'whitesmoke'}}>{'<'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {[debuggerStyles.button, {left: 75}]} onPress={() => this.DEBUG_nextTurn()}>
            <Text style={{color: 'whitesmoke'}}>{'>'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {[debuggerStyles.button, {left: 105, backgroundColor: this.state.isNearOverride?'tomato':'gray'}]} onPress={() => this.DEBUG_toggleIsNearOverride()}>
            <Text style={{color: 'whitesmoke'}}>{'@'}</Text>
        </TouchableOpacity>
    </View>
    }
    {true &&
    <View style={{alignItems: 'center', justifyContent: 'center', width: d_window.width, zIndex: 1, paddingTop: 285}}>
        <Text style = {debuggerStyles.title}>
            DEBUGGER
        </Text><Text/>

        <Text> Stage/Turn:   {Turns.stage},{Turns.turn}</Text>

        <Text style = {debuggerStyles.subtitle}>
            CURRENT TARGET
        </Text>
        <Text> Longitude: {this.state.currentTargetPos.longitude}</Text>
        <Text> Latitude: {this.state.currentTargetPos.latitude}</Text>
        <Text> distToCurrent: {JSON.stringify(Math.round(this.state.distToCurrent))} FT</Text>

        <Text style = {debuggerStyles.subtitle}>
            NEXT TARGET
        </Text>
        <Text> Longitude: {this.state.nextTargetPos.longitude}</Text>
        <Text> Latitude: {this.state.nextTargetPos.latitude}</Text>
        <Text/>
        <Text> distToNext: {JSON.stringify(Math.round(this.state.distToNext))} FT</Text>
        <Text> nextRadius: {JSON.stringify(Math.round(this.state.nextRadius))} FT</Text>
        <Text> isNear: {JSON.stringify(this.state.isNear)} </Text>

        <Text style = {debuggerStyles.subtitle}>
            LAST
        </Text>
        <Text> Longitude: {this.state.lastPos.longitude}</Text>
        <Text> Latitude: {this.state.lastPos.latitude}</Text>
        <Text> Accuracy: {JSON.stringify(Math.round(this.state.lastPos.accuracy))} FT</Text>
        <Text/>
    </View>
    }

};