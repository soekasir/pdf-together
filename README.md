# PDF-Together 
>"Do task together as a team" ~ [Soekasir] & [EMI]

## Features
- Annotation
- Draw and Image
- Text
    - Rectangle
- Chat and Reply
- Management Task
    - Task priority
    - Solved and not-solved task marker
    - Accept and reject task
- Connect to server

### Documentation Clean Code

Conceptually, logic code divided into [class Draw]  and [class Layers], conected to react-component using [class Together] as parent and [class PdfTogether] as final-child.

Value ``PdfTogetherContext`` is [class PdfTogether] served by costum hooks ``usePdfTogether``. So we ready to use it in component. Mainly, property of ``PdfTogether.prop`` is ``state`` and ``PdfTogether.meth`` is ``setState``. 

To fill value of layer, declare [new LayerValue] and class that inherit from it. With Type data in [Validation], all data become an object like _``Author``_, _``Annotation``_, _``Draw``_, _``Img``_, _``Chat``_ and implemented on some classes in [MainModel].

#### Note:
~~~
-For more documentation of this project code, src\Models\Interfaces
-This project is private in github

“Clean Code always looks like it was written by someone who cares” -Robert C. Martin-
~~~

[//]: # (Markdown here)
   [Soekasir]: <https://github.com/soekasir>
   [EMI]: <https://>
   [Validation]: src/Models/Interfaces/Type.ts
   [class Draw]: src/Models/Draw/Draw.ts
   [class Layers]: src/Models/Layers/Layers.ts
   [class PdfTogether]: src/ Models /Main/MainPdfTogether.ts
   [class Together]: src/Models/Main/MainPdfTogether.ts
   [new LayerValue]: src/Models/Main/MainModel.ts
   [MainModel]: src/Models/Main/MainModel.ts